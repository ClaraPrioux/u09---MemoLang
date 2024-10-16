```java
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        String csvFile = "./out/translations.csv"; // Specify the path to the CSV file

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(csvFile))) {
            // Write the CSV header
            writer.write("Word;Translation");
            writer.newLine();

            // Specify the paths to both XML files
            File engSweXmlFile = new File("./input/lexicon_eng_swe.xml"); // Your eng-swe file
            File sweEngXmlFile = new File("./input/lexicon_swe_eng.xml"); // Your swe-eng file

            // Use the same method to process both files
            HashSet<String> existingWordTranslations = new HashSet<>();
            processXmlFile(engSweXmlFile, writer, existingWordTranslations, true);  // Process eng-swe
            processXmlFile(sweEngXmlFile, writer, existingWordTranslations, false); // Process swe-eng

            System.out.println("CSV file created successfully.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // A method to process each XML file
    private static void processXmlFile(File xmlFile, BufferedWriter writer, HashSet<String> existingWordTranslations, boolean isEngSwe) throws Exception {
        // Create a DocumentBuilderFactory and DocumentBuilder
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();

        // Parse the XML file into a Document
        Document document = builder.parse(xmlFile);
        document.getDocumentElement().normalize();

        // Get all <word> elements
        NodeList wordList = document.getElementsByTagName("word");

        // Store the elements in a list for sorting
        ArrayList<Element> words = new ArrayList<>();
        for (int i = 0; i < wordList.getLength(); i++) {
            words.add((Element) wordList.item(i));
        }

        // Loop through the words and process each word-translation pair
        for (Element wordElement : words) {
            String wordValue = wordElement.getAttribute("value");
            String wordComment = wordElement.getAttribute("comment");

            // Skip the word if comment contains "informellt"
            if (wordComment != null && wordComment.contains("informellt")) {
                continue; // Skip this word and go to the next one
            }

            // Get <translation> elements within the current <word>
            NodeList translationList = wordElement.getElementsByTagName("translation");

            String translationValue = null;

            // Loop through the translations and take the first one
            for (int j = 0; j < translationList.getLength(); j++) {
                Element translationElement = (Element) translationList.item(j);
                translationValue = translationElement.getAttribute("value");
                break; // Stop after finding the first translation
            }

            // Ensure both word and translation exist before writing to the CSV
            if (translationValue != null) {
                // Create a unique key for the word-translation pair, in the proper direction
                String wordTranslationPair;
                if (isEngSwe) {
                    wordTranslationPair = wordValue + "-" + translationValue; // English word, Swedish translation
                } else {
                    wordTranslationPair = translationValue + "-" + wordValue; // Swedish word, English translation
                }

                // Check if this word-translation pair already exists
                if (!existingWordTranslations.contains(wordTranslationPair)) {
                    // Write the word and translation in the correct order based on the lexicon
                    if (isEngSwe) {
                        writer.write(wordValue + ";" + translationValue); // English -> Swedish
                    } else {
                        writer.write(translationValue + ";" + wordValue); // Swedish -> English
                    }
                    writer.newLine();
                    // Add the word-translation pair to the set to track it
                    existingWordTranslations.add(wordTranslationPair);
                }
            }
        }
    }
}

```
