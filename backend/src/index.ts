import express from "express";
import connectDB from "./config/dbConfig"; // Import the connectDB function
import authRoutes from "./routes/authRoutes";
import wordsRoutes from "./routes/wordsRoutes";
import adminRoutes from "./routes/adminRoutes";
import profileRoutes from "./routes/profileRoutes";
import cors from "cors";
import emailRoute from "./routes/emailRoute";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  // Start the server only after a successful connection
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Allow requests from your frontend
const allowedOrigins = [
  "https://u09-memolang.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Just for render
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// All the routes
app.use("/auth", authRoutes);
app.use("/word", wordsRoutes);
app.use("/admin", adminRoutes);
app.use("/profile", profileRoutes);
app.use("/email", emailRoute);
