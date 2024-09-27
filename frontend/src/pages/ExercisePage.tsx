import React, { useEffect, useState } from "react";

// Define the type for each word object
interface Word {
  word: string;
  translation: string;
  word_id: string;
}

const ExercisePage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todaysWords, setTodaysWords] = useState<
    { word: string; translation: string; word_id: string }[]
  >([]);
  const [exerciseMessage, setExerciseMessage] = useState("");

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
          setSuccessMessage("juste en attendant");

          // run the exercise function to display the corresponding quesiton
          if (data.todaysWords.length > 0) {
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

  // Return a question about the word of the day, in eng or swe (random)
  const exercise = (todaysWords: Word[]): string => {
    const randomIndex = Math.floor(Math.random() * todaysWords.length);
    const randomWordObject = todaysWords[randomIndex];

    const isWord = Math.random() < 0.5;

    if (isWord) {
      // ENG -> SWE
      return `How do you say "${randomWordObject.word}" in Swedish?`;
    } else {
      // SWE -> ENG
      return `Hur man säger "${randomWordObject.translation}" på engelska?`;
    }
  };

  // CREATE FUNCTION TO CHECK ANSWER:
  // - Take Word and Translation from randomIndex => if input === Word OR Translation => success + ??add somewhere that it's done to not display it again
  // => if input != Word Or Translation => /getContext + display Translation + ??add somewhere that it's done to not display it again

  return (
    <div className="w-2/3 md:w-3/6 mx-auto mt-52 md:mt-32 font-jost">
      <div className="block bg-white w-full p-4 border border-blueBorder rounded-md drop-shadow-md">
        <p>{exerciseMessage}</p>
      </div>
      <form className="space-y-5 mt-6">
        <div>
          <label htmlFor="word"></label>
          <input
            type="word"
            id="word"
            name="word"
            placeholder="Write the answer here..."
            className="block w-full p-6 border border-blueBorder rounded-md drop-shadow-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-4 px-4 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80"
          >
            Check
          </button>
          {successMessage && (
            <p className="text-center p-8 text-xl text-green-300">
              🎉 {successMessage} 🎉
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExercisePage;
