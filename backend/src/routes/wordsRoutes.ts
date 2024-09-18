import express from "express";
import jwt from "jsonwebtoken";
// import Users_word from '../models/Users_word';
import authMiddleware from "../middlewares/authMiddleware";
import mongoose from "mongoose";
const secretKey = process.env.SECRET_KEY!;

const router = express.Router();

interface DecodedToken {
  id: string;
}

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // Take the word and context from input
    const { word } = req.body;

    // Extract the user_id from the token and decode it
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    // Search for the word in the words collection
    const wordsFound = await mongoose.connection
      .collection("words")
      .find({
        $or: [{ Word: word }, { Translation: word }],
      })
      .toArray();
    if (!wordsFound) {
      return res.status(401).json({ message: "Word not found!", user_id });
    }

    return res.status(200).json({ message: "Word found!", wordsFound });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
});

export default router;
