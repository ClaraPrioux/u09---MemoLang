import React from "react";
import { Link } from "react-router-dom";
import elephantImage from "../assets/elephant-hi.webp";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center m-16 flex-1">
      <div className="flex flex-col md:flex-row  max-w-6xl mx-auto p-4 items-center">
        {/* Image Section */}
        <div className="flex-shrink-0 md:w-1/2">
          <img src={elephantImage} alt="Elephant" className="w-full md:w-2/3" />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center md:w-1/2 md:pl-8 space-y-2">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg mt-4 text-center">
            MemoLang
          </h1>
          <h2 className="text-white text-2xl md:text-3xl drop-shadow-lg text-center">
            Your daily companion for effortless word memorization!
          </h2>

          <Link to="/about">
            <button className="w-full bg-blueBorder text-white text-lg font-bold py-2 px-2 mt-8 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80">
              Read more about it
            </button>
          </Link>
          <div className="flex gap-1">
            <Link to="/register" className="w-full">
              <button className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-2 px-2 mt-3 md:mt-0 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80">
                Register
              </button>
            </Link>
            <Link to="/login" className="w-full">
              <button className="w-full bg-white bg-opacity-60 text-white text-lg font-bold py-2 px-2 mt-3 md:mt-0 rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
