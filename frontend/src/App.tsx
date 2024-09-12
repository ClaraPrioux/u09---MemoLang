import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddPage from "./pages/AddPage";
// import ExercisePage from './pages/ExercisePage';
// import AboutPage from './pages/AboutPage';
// import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div className="bg-custom-gradient min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<AddPage />} />
          {/*<Route path="/review" element={<ExercisePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<DashboardPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
