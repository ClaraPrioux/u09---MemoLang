import React, { useState, useEffect, useCallback } from "react";
import RegisterPage from "./RegisterPage";
import Logout from "../components/LogoutBtn";

type User = {
  user_id: string;
  username: string;
  email: string;
  role: string;
};

const AdminDashPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // States for email sending
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailText, setEmailText] = useState("");

  // Fetch the users
  const fetchUsers = useCallback(async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/admin/getUsers`, {
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle edit button click
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  // Handle input changes for editing
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser((prevEditingUser) => ({
        ...prevEditingUser!,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Submit edited user
  const handleEditSubmit = async () => {
    if (editingUser) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await fetch(`${apiUrl}/admin/updateUser`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editingUser),
        });

        if (!res.ok) throw new Error("Error updating user");
        fetchUsers();
        setIsEditing(false);
        setEditingUser(null);
      } catch (error) {
        console.error("Error updating user", error);
      }
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (email: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/admin/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Error deleting user");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Send email function
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailSubject,
          text: emailText,
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Error sending email");
      }

      setRecipientEmail("");
      setEmailSubject("");
      setEmailText("");
      console.log("Email sent successfully");
    } catch (error) {
      const err = error as Error;
      setEmailError(err.message);
      console.error("Error sending email", error);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="m-4 md:m-14 font-jost flex-1">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-bold drop-shadow-lg">
          Hi Admin, <br /> Welcome to the dashboard!
        </h1>
        <Logout />
      </div>

      <div className="mt-6 md:mt-10">
        <table className="w-full bg-white text-black rounded-md shadow-md mb-10">
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="text-center">
                <td className="py-2 px-2 md:px-4 border-r border-greenBorder">
                  {isEditing && editingUser?.user_id === user.user_id ? (
                    <input
                      type="text"
                      name="username"
                      value={editingUser.username}
                      onChange={handleEditChange}
                      className="border p-1 overflow-x-auto w-2/3"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(user)}>
                      {user.username}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 md:px-4 border-r border-greenBorder">
                  {isEditing && editingUser?.user_id === user.user_id ? (
                    <input
                      type="text"
                      name="email"
                      value={editingUser?.email}
                      onChange={handleEditChange}
                      className="border p-1 overflow-x-auto w-2/3"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(user)}>
                      {user.email}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 md:px-4">
                  {isEditing && editingUser?.user_id === user.user_id ? (
                    <input
                      type="text"
                      name="role"
                      value={editingUser.role}
                      onChange={handleEditChange}
                      className="border p-1 overflow-x-auto w-2/3"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(user)}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 md:px-4">
                  {isEditing && editingUser?.user_id === user.user_id ? (
                    <button onClick={handleEditSubmit} className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="green"
                        className="size-6 hover:stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteUser(user.user_id)}
                      className=""
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red"
                        className="size-6 hover:stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex md:flex-row flex-col items-center space-y-4 md:space-y-0 md:space-x-20">
          <div className="flex flex-col md:w-1/2 w-3/4">
            <h2 className="text-center mb-8 mt-8 md:mt-0 text-white text-2xl font-bold drop-shadow-lg">
              Create a user
            </h2>
            <RegisterPage />
          </div>
          {/* Email Sending Form */}
          <form
            onSubmit={sendEmail}
            className="flex flex-col space-y-4 md:w-1/3 w-3/4"
          >
            <h2 className="text-center mb-8 mt-8 md:mt-0 text-white text-2xl font-bold drop-shadow-lg">
              Send an email
            </h2>
            <input
              type="email"
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="block w-full p-3 border border-blue-500 rounded-md drop-shadow-md"
            />
            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              required
              className="block w-full p-3 border border-blue-500 rounded-md drop-shadow-md"
            />
            <textarea
              placeholder="Email Body"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              required
              className="block w-full p-3 border border-blue-500 rounded-md drop-shadow-md"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <button
              type="submit"
              disabled={emailLoading}
              className={`w-full bg-white bg-opacity-60 text-white font-bold py-2 px-4 rounded-md drop-shadow-md border border-blue-500 hover:bg-opacity-80 ${emailLoading ? "opacity-50" : ""}`}
            >
              {emailLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashPage;
