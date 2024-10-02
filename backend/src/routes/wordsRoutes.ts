import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import Users_word from "../models/Users_word";
import mongoose from "mongoose";
const secretKey = process.env.SECRET_KEY!;

const router = express.Router();

interface DecodedToken {
  id: string;
}

// GET SUGGESTIONS ENDPOINT
router.post("/getSuggestions", authMiddleware, async (req, res) => {
  try {
    const { word } = req.body;

    // Find words matching the input word or translation
    const wordsFound = await mongoose.connection
      .collection("words")
      .find({
        $or: [{ Word: word }, { Translation: word }],
      })
      .toArray();

    // Include word_id in the returned suggestions
    const suggestions = wordsFound.map((word) => ({
      word: word.Word,
      translation: word.Translation,
      word_id: word._id,
    }));

    return res.status(200).json({ suggestions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching suggestions", error });
  }
});

// ADD WORD ENDPOINT
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { wordId, context } = req.body;

    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    // Create a new Users_word document
    const newUserWord = new Users_word({
      usersword_id: new mongoose.Types.ObjectId(),
      word_id: wordId,
      user_id,
      context: context,
      creation_date: new Date(),
      date_1: new Date(),
      date_7: new Date(),
      date_30: new Date(),
    });

    await newUserWord.save();

    return res.status(200).json({ message: "Word and translation saved!" });
  } catch (error) {
    return res.status(500).json({ message: "Error saving word", error });
  }
});

// GET TODAY'S WORDS ENDPOINT
router.get("/getTodaysWords", authMiddleware, async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    const todaysDate = "2024-10-03"; // new Date().toISOString().split("T")[0]

    // Find words where date_1, date_7, or date_30 match today's date and are not completed yet
    const findWords = await mongoose.connection
      .collection("userswords")
      .find({
        user_id: new mongoose.Types.ObjectId(user_id),
        $or: [
          {
            $and: [{ date_1: todaysDate }, { completed_1: false }],
          },
          {
            $and: [{ date_7: todaysDate }, { completed_7: false }],
          },
          {
            $and: [{ date_30: todaysDate }, { completed_30: false }],
          },
        ],
      })
      .toArray();

    if (!findWords || findWords.length === 0) {
      return res.status(200).json({ todaysWords: [] });
    }

    // Get the list of word IDs from the findWords result
    const wordIds = findWords.map((word) => word.word_id);
    const wordsList = await mongoose.connection
      .collection("words")
      .find({ _id: { $in: wordIds } })
      .toArray();

    // Add review_day only if a word is found, this will be used to mark it later
    const todaysWords = findWords
      .map((userWord) => {
        let review_day = "";
        if (userWord.date_1 === todaysDate) {
          review_day = "date_1";
        } else if (userWord.date_7 === todaysDate) {
          review_day = "date_7";
        } else if (userWord.date_30 === todaysDate) {
          review_day = "date_30";
        }

        const word = wordsList.find((w) => w._id.equals(userWord.word_id));

        // Ensure word exists before creating the response object
        if (word) {
          return {
            word: word.Word,
            translation: word.Translation,
            word_id: word._id,
            review_day,
          };
        }
      })
      .filter((entry) => entry !== undefined);

    return res.status(200).json({ todaysWords });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error returning today's words", error });
  }
});

// MARK AS COMPLETED'S ENDPOINT
router.post("/markAsCompletedForDay", authMiddleware, async (req, res) => {
  const { word_id, review_day } = req.body;

  // Function to create the update object dynamically
  const updateField = (review_day: string) => {
    switch (review_day) {
      case "date_1":
        return { completed_1: true };
      case "date_7":
        return { completed_7: true };
      case "date_30":
        return { completed_30: true };
      default:
        return null;
    }
  };

  // Generate the update field
  const update = updateField(review_day);
  if (!update) {
    console.error("Invalid review day provided:", review_day);
    return res.status(400).json({ message: "Invalid review day provided" });
  }

  // Now we can update it in the database
  try {
    const result = await Users_word.updateOne(
      { word_id: new mongoose.Types.ObjectId(word_id) },
      { $set: update }
    );

    console.log("Update result:", result);

    res.json({ message: `Word marked as completed for ${review_day}` });
  } catch (error) {
    console.error("Error updating word:", error);
    res
      .status(500)
      .json({ message: "Error marking word as completed for day", error });
  }
});

export default router;
