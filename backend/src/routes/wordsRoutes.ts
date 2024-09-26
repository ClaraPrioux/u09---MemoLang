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
      context: context,
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

// Search for words to review today (words that have today's date in day_1 or day_7 or day_30)
router.get("/getTodaysWords", authMiddleware, async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    // Get today's date in YYYY-MM-DD format
    const todaysDate = new Date().toISOString().split("T")[0];

    // Find words where date_1, date_7, or date_30 match today's date
    const findWords = await mongoose.connection
      .collection("userswords")
      .find({
        $and: [
          { user_id: new mongoose.Types.ObjectId(user_id) },
          {
            $or: [
              { date_1: todaysDate },
              { date_7: todaysDate },
              { date_30: todaysDate },
            ],
          },
        ],
      })
      .toArray();

    // Map the results to the required format
    const todaysWords = findWords.map((word) => ({
      word: word.Word,
      translation: word.Translation,
      word_id: word._id,
    }));

    return res.status(200).json({ todaysWords });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error returning today's words", error });
  }
});

export default router;
