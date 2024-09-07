import express from "express";
import connectDB from "./config/dbConfig"; // Import the connectDB function

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
