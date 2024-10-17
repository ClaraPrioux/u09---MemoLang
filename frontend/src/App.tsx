import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ExercisePage from "./pages/ExercisePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminDashPage from "./pages/AdminDashPage";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteAdmin from "./components/protectedRouteAdmin";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <div className="bg-custom-gradient flex flex-col min-h-screen">
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        {/* Conditionally render mobile menu */}
        {!isMenuOpen && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review"
              element={
                <ProtectedRoute>
                  <ExercisePage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<ProtectedRouteAdmin />}>
              <Route index element={<AdminDashPage />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )}
        {!isMenuOpen && <Footer />}
      </div>
    </Router>
  );
}

export default App;
