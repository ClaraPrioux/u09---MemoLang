import React, { useEffect, useState } from "react";

interface Word {
  word: string;
  translation: string;
  word_id: string;
}

const ExercisePage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todaysWords, setTodaysWords] = useState<Word[]>([]);
  const [exerciseMessage, setExerciseMessage] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [randomWordObject, setRandomWordObject] = useState<Word | null>(null);
  const [contextMessage, setContextMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // When the page loads, this useEffect fetches todays words from backend, and call methods
  useEffect(() => {
    fetch("http://localhost:3000/word/getTodaysWords", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error: ${res.status}`);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.todaysWords) {
          setTodaysWords(data.todaysWords);

          if (data.todaysWords.length === 0) {
            setExerciseMessage("No words for today!");
          } else {
            const message = exercise(data.todaysWords);
            setExerciseMessage(message);
          }
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching words of the day:", err);
      });
  }, []);

  // Ask questions depending on the word (in english or in swedish)
  const exercise = (todaysWords: Word[]): string => {
    const randomIndex = Math.floor(Math.random() * todaysWords.length);
    const selectedWord = todaysWords[randomIndex];
    setRandomWordObject(selectedWord);

    const isWord = Math.random() < 0.5;

    if (isWord) {
      // ENG -> SWE
      return `How do you say "${selectedWord.word}" in Swedish?`;
    } else {
      // SWE -> ENG
      return `Hur man säger "${selectedWord.translation}" på engelska?`;
    }
  };

  // Check if the user's answer is correct
  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!randomWordObject) return;

    const { word, translation, word_id } = randomWordObject;

    if (
      inputValue.toLowerCase() === word.toLowerCase() ||
      inputValue.toLowerCase() === translation.toLowerCase()
    ) {
      setSuccessMessage("Correct! 🎉");
      setErrorMessage("");
    } else {
      setErrorMessage(`Incorrect! Word: ${word}, Translation: ${translation}`);
      setSuccessMessage("");
      fetchContext(word_id);
    }

    setInputValue("");
  };

  // If answer is not correct, fetch the Context to display it
  const fetchContext = (word_id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch(`http://localhost:3000/word/getContext`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ word_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.context) {
          setContextMessage(
            `Remember, you learned this word in this context: ${data.context}`
          );
        } else {
          console.error("No context found for the word");
        }
      })
      .catch((err) => console.error("Error fetching context:", err));
  };

  return (
    <div className="w-2/3 md:w-3/6 mx-auto mt-52 md:mt-32 font-jost">
      <div className="block bg-white w-full p-4 border border-blueBorder rounded-md drop-shadow-md">
        <p>{exerciseMessage}</p>
      </div>
      <form className="space-y-5 mt-6" onSubmit={checkAnswer}>
        <div>
          <label htmlFor="word"></label>
          <input
            type="text"
            id="word"
            name="word"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write the answer here..."
            className={`block w-full p-6 border rounded-md drop-shadow-md ${
              errorMessage ? "border-red-500" : "border-blueBorder"
            }`}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-4 px-4 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80"
          >
            Check
          </button>
        </div>

        {errorMessage && (
          <p className="text-center p-8 text-xl text-red-500">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-center p-8 text-xl text-green-300">
            {successMessage}
          </p>
        )}
        {contextMessage && (
          <p className="text-center p-8 text-lg text-gray-600">
            {contextMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ExercisePage;
