import React from "react";

const Logout: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-white bg-opacity-60 text-white text-sm font-bold h-8 pl-4 pr-4 text-center rounded-md drop-shadow-md border border-blueBorder hover:bg-opacity-80"
    >
      Logout
    </button>
  );
};

export default Logout;
