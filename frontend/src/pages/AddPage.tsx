import React, { useState, useEffect } from "react";

const AddPage: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [wordId, setWordId] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { word: string; translation: string; word_id: string }[]
  >([]);
  const [saveMessage, setsaveMessage] = useState<string>("");

  // Fetch suggestions from the backend as the user types
  useEffect(() => {
    if (word.length > 1) {
      const apiUrl = process.env.REACT_APP_API_URL;
      fetch(`${apiUrl}/word/getSuggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ word }),
      })
        .then((res) => {
          if (res.status === 401) {
            window.location.href = "/login";
            return;
          }
          return res.json();
        })
        .then((data) => {
          setSuggestions(data.suggestions);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
        });
    } else {
      console.log("Type your word!");
    }
  }, [word]);

  // Handle click on a word suggestion
  const handleClickWord = (
    suggestionWord: string,
    suggestionTranslation: string,
    id: string
  ) => {
    setWord(`${suggestionWord} - ${suggestionTranslation}`);
    setWordId(id);
    setSuggestions([]);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wordId) {
      alert("Please select a word from the suggestions.");
      return;
    }

    // Gather information for the request
    const payload = {
      wordId,
      context,
    };

    // Send the wordId and context to the backend
    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      const res = await fetch(`${apiUrl}/word/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        console.log("Word saved successfully:", result);
        // Reset form after success
        setWord("");
        setContext("");
        setWordId("");
        setsaveMessage(`Word added!`);
      } else {
        console.error("Error saving word:", result.message);
        setsaveMessage(`Impossible to add ${word}, contact support!`);
      }
    } catch (err) {
      console.error("Error during save:", err);
    }
  };

  return (
    <div className="w-2/3 md:w-3/6 mx-auto mt-32 md:mt-32 font-jost flex-1">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="word"></label>
          <input
            type="text"
            id="word"
            name="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Write and select a new word here...."
            className="block w-full p-4 border border-blueBorder rounded-md drop-shadow-md"
          />
          {/* Display suggestions if available */}
          {suggestions && (
            <ul className="rounded-md shadow-md bg-white mt-2 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.word_id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    handleClickWord(
                      suggestion.word,
                      suggestion.translation,
                      suggestion.word_id
                    )
                  }
                >
                  {suggestion.word} - {suggestion.translation}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="context"></label>
          <textarea
            id="context"
            name="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Describe the context in which you learned this word..."
            className="block w-full h-32 p-4 pt-2 border border-blueBorder rounded-md drop-shadow-md text-top"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-4 px-4 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80"
          >
            Save
          </button>
          {saveMessage && (
            <div className="text-center p-4 text-xl text-green-500 border border-green-500 rounded-lg bg-green-100 mx-auto w-1/3 mt-4">
              ✅ {saveMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPage;
