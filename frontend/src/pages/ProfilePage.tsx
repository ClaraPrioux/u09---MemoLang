import React, { useState, useEffect, useCallback } from "react";
import Logout from "../components/LogoutBtn";

type UsersWords = {
  _id: string;
  Word: string;
  Translation: string;
};

const ProfilePage = () => {
  const [user, setUser] = useState<{
    username: string;
  } | null>(null);
  const [usersWords, setUsersWords] = useState<UsersWords[]>([]);

  // Fetch the users
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/profile/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching users");

      const data = await res.json();
      setUser(data.userInfo);
      fetchUsersWords();
    } catch (error) {
      console.error("Error fetching users", error);
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

      if (!res.ok) throw new Error("Error fetching users");

      const data = await res.json();
      setUsersWords(data.words);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, []);

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
              92 <br /> words
            </p>
          </div>
          <div className="py-32 px-56 bg-white shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
