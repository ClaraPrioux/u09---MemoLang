import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware";
import Users_word from "../models/Users_word";
import mongoose from "mongoose";
const secretKey = process.env.SECRET_KEY!;

const router = express.Router();

interface DecodedToken {
  id: string;
}

// Get word suggestions when user type a word
router.post("/getSuggestions", authMiddleware, async (req, res) => {
  try {
    const { word } = req.body;

    // Find words matching the input word or translation
    const wordsFound = await mongoose.connection
      .collection("words")
      .find({
        $or: [{ Word: word }, { Translation: word }],
      })
      .toArray();

    if (wordsFound.length === 0) {
      return res.status(404).json({ message: "No words found!" });
    }

    // Include word_id in the returned suggestions
    const suggestions = wordsFound.map((word) => ({
      word: word.Word,
      translation: word.Translation,
      word_id: word._id,
    }));

    return res.status(200).json({ suggestions });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching suggestions", error });
  }
});

// Save the selected word and translation
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { wordId, context } = req.body;

    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    // Create a new Users_word document
    const newUserWord = new Users_word({
      usersword_id: new mongoose.Types.ObjectId(),
      word_id: wordId,
      user_id,
      context,
      creation_date: new Date(),
      date_1: new Date(),
      date_7: new Date(),
      date_30: new Date(),
    });

    await newUserWord.save();

    return res.status(200).json({ message: "Word and translation saved!" });
  } catch (error) {
    return res.status(500).json({ message: "Error saving word", error });
  }
});

export default router;
