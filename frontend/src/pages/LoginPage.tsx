import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // Initialization of formData (useState)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  // When user types, it updates the FormData
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // Then the updated FormData is sent to the backend
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCredentials = { email, password };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="w-2/3 md:w-1/4 mx-auto mt-52 md:mt-32 font-jost flex-1">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            className="block w-full p-3 border border-blue-500 rounded-md drop-shadow-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            className="block w-full p-3 border border-blue-500 rounded-md drop-shadow-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-white bg-opacity-60 text-white font-bold py-2 px-4 rounded-md drop-shadow-md border border-blue-500 hover:bg-opacity-80"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
