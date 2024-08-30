import express from "express";
import connectDB from "./config/dbConfig"; // Import the connectDB function
import config from "./config/config"; // Import the configuration object

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  // Start the server only after a successful connection
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});
