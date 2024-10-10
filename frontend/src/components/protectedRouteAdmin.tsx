import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import parseJwt from "../utils/parseJwt"; // Adjust the path based on your file structure

const ProtectedRouteAdmin = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Check token and role when the component mounts
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to home if there is no token
    } else {
      const decodedData = parseJwt(token);
      if (!decodedData || decodedData.role !== "admin") {
        navigate("/"); // Redirect to home if not an admin
      }
    }
  }, [token, navigate]);

  // If the user is an admin, render the Outlet
  const decodedData = token ? parseJwt(token) : null;

  // Only render the Outlet if the user is an admin
  return decodedData && decodedData.role === "admin" ? <Outlet /> : null;
};

export default ProtectedRouteAdmin;
