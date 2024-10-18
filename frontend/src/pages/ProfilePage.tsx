import { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale);

import Logout from "../components/LogoutBtn";

type UsersWords = {
  _id: string;
  Word: string;
  Translation: string;
};

type WordsPerWeek = {
  _id: number;
  wordCount: number;
};

const ProfilePage = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [usersWords, setUsersWords] = useState<UsersWords[]>([]);
  const [numberOfWords, setNumberOfWords] = useState<number>(0);
  const [wordsPerWeek, setWordsPerWeek] = useState<WordsPerWeek[]>([]);

  // Fetch the user
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/profile/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching user");

      const data = await res.json();
      setUser(data.userInfo);
      fetchUsersWords();
      fetchWordsPerWeek();
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fetch the user's words
  const fetchUsersWords = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/profile/getWords", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching user words");

      const data = await res.json();
      setUsersWords(data.words);
      wordsCounter(data.words);
    } catch (error) {
      console.error("Error fetching user words", error);
    }
  }, []);

  // Fetch words created per week
  const fetchWordsPerWeek = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/profile/getWordsCreatedPerWeek",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error fetching words per week");

      const data = await res.json();
      setWordsPerWeek(data.wordsPerWeek);
    } catch (error) {
      console.error("Error fetching words per week", error);
    }
  }, []);

  // Count the number of words in usersWords array
  const wordsCounter = (usersWords: UsersWords[]) => {
    const numberOfWords = usersWords.length;
    setNumberOfWords(numberOfWords);
  };

  // Prepare data for the chart
  const chartData = {
    labels: wordsPerWeek.map((week) => `week ${week._id}`),
    datasets: [
      {
        label: "words added",
        data: wordsPerWeek.map((week) => week.wordCount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Options for the chart _ IMPROVE IF I HAVE TIME
  const chartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="m-4 md:m-14 font-jost flex-1">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold drop-shadow-lg">
          Hi {user ? user.username : "Loading..."}, <br /> Welcome to the
          dashboard!
        </h1>
        <Logout />
      </div>

      <div className="flex md:flex-row flex-col justify-center items-center md:space-x-48">
        <div className="mt-6 md:mt-10">
          <div className="w-full h-96 overflow-y-auto bg-white rounded-md shadow-md mb-10">
            <table className="w-80 text-black">
              <tbody>
                {usersWords.map((wordObj) => (
                  <tr key={wordObj._id} className="border-b border-gray-100">
                    <td className="p-2">{wordObj.Word}</td>
                    <td className="p-1">{wordObj.Translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col space-y-10 mb-10 items-center">
          <div className="flex justify-center items-center bg-white rounded-full shadow-xl md:text-2xl text-lg w-36 md:w-42 h-36 md:h-42 mt-0">
            <p className="text-center">
              {numberOfWords} <br /> words
            </p>
          </div>

          <div className="py-8 px-8 bg-white shadow-lg">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
