import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddPage from "./pages/AddPage";
import ExercisePage from "./pages/ExercisePage";
// import AboutPage from './pages/AboutPage';
import AdminDashPage from "./pages/AdminDashPage";
// import ProfilePage from './pages/ProfilePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div className="bg-custom-gradient min-h-screen min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<AddPage />} />
          <Route path="/review" element={<ExercisePage />} />
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />*/}
          <Route path="/profile" element={<AdminDashPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
