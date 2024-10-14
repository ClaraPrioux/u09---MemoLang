import { Link } from "react-router-dom";
import elephantImg from "../assets/elephant-show.webp";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 font-jost gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-white text-2xl md:text-3xl drop-shadow-lg text-centertext-white text-2xl md:text-3xl drop-shadow-lg text-center">
            You need to be logged in <br /> to access this page.
          </p>
          <div className="flex gap-1 m-4">
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
        <img src={elephantImg} alt="Please log in" className="w-1/4" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
