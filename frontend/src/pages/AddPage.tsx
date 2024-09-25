import React, { useState, useEffect } from "react";

const AddPage: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { word: string; translation: string; word_id: string }[]
  >([]);

  // Fetch suggestions from the backend as the user types
  useEffect(() => {
    if (word.length > 1) {
      fetch("http://localhost:3000/word/getSuggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ word }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.suggestions);
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
        });
    } else {
      console.log("No word typed!");
    }
  }, [word]);

  return (
    <div className="w-2/3 md:w-3/6 mx-auto mt-52 md:mt-32 font-jost">
      <form className="space-y-5">
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700"
          ></label>
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
            <ul className="border border-gray-300 rounded-md shadow-md bg-white mt-2 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.word_id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.word} - {suggestion.translation}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label
            htmlFor="context"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <textarea
            id="context"
            name="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Write the context related to this new word here..."
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
        </div>
      </form>
    </div>
  );
};

export default AddPage;
