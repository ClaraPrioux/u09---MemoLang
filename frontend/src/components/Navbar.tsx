import React, { useState } from "react";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.webp";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl px-4 sm:px-4 lg:px-2">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/add">
              <img src={logo} alt="Logo" className="h-14 w-auto" />
            </a>
          </div>

          {/* Desktop navbar */}
          <div className="hidden md:flex items-center space-x-10 text-white font-jost font-bold">
            <button className="hover:text-gray-600">
              <a href="/about">ABOUT</a>
            </button>
            <button className="hover:text-gray-600">
              <a href="/">ADD</a>
            </button>
            <button className="hover:text-gray-600">
              <a href="/review">REVIEW</a>
            </button>
            <button className="flex items-center">
              <a href="/profile">
                <img
                  src={profile}
                  alt="Profile"
                  className="h-12 w-12 m-2 rounded-full border-2 border-white hover:border-gray-600"
                />
              </a>
            </button>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="justify-center flex flex-col font-jost">
            <div className="flex flex-col m-8">
              <img
                src={profile}
                alt="Profile"
                className="h-24 w-24 m-2 rounded-full border-2 border-white hover:border-gray-600"
              />
              <p className="text-white text-3xl mt-4">Username</p>
            </div>
            <div className="bg-white min-h-screen flex flex-col items-start text-2xl p-2">
              <div className="flex m-2  mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>

                <button className="pl-4">
                  <a href="/about">About MemoLang</a>
                </button>
              </div>
              <div className="flex p-2 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <button className="pl-4">
                  <a href="/add">Add a word</a>
                </button>
              </div>
              <div className="flex p-2 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <button className="pl-4">
                  <a href="/review">Review your words</a>
                </button>
              </div>
              <div className="flex p-2 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <button className="pl-4">
                  <a href="/profile">Profile</a>
                </button>
              </div>
              <p className="text-gray-300 mx-auto absolute bottom-4 left-1/2 transform -translate-x-1/2">
                Memolang
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
