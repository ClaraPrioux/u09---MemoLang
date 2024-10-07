import React, { useState, useEffect } from "react";

type User = {
  username: string;
  email: string;
  role: string;
};

const AdminDashPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/getUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Error fetching users");
        const data = await res.json();
        setUsers(data.usersInfo);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="m-14 font-jost">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold drop-shadow-lg">
          Hi Admin, <br /> Welcome to the dashboard!
        </h1>
        <button className="bg-white bg-opacity-60 text-white text-sm font-bold h-8 pl-4 pr-4 text-center rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80">
          Logout
        </button>
      </div>

      <div className="mt-10">
        <table className="w-full bg-white text-black rounded-md shadow-md mb-10">
          <thead>
            <tr className="text-white text-center">Users list</tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="text-center">
                <td className="py-2 px-4 border-r border-greenBorder">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-r border-greenBorder">
                  {user.email}
                </td>
                <td className="py-2 px-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashPage;
