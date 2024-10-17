import React, { useState, useEffect, useCallback } from "react";
import Logout from "../components/LogoutBtn";

const ProfilePage = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

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
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="m-4 md:m-14 font-jost">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold drop-shadow-lg">
          Hi {user ? user.username : "Loading..."}, <br /> Welcome to the
          dashboard!
        </h1>
        <Logout />
      </div>

      <div className="flex md:flex-row flex-col justify-center items-center md:space-x-36">
        <div className="flex justify-center items-center bg-white rounded-full md:text-2xl text-lg w-36 md:w-56 h-36 md:h-56 md:mt-0 mt-10">
          <p className="text-center">
            92 <br /> words
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
