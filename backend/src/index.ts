import express from "express";
import connectDB from "./config/dbConfig"; // Import the connectDB function
import authRoutes from "./routes/authRoutes";
import wordsRoutes from "./routes/wordsRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";

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
app.use(
  cors({
    origin: "http://localhost:5173", // https://u09-memolang.netlify.app
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
