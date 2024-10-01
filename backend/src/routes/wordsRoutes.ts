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

// GET SUGGESTIONS ENDPOINT
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

// ADD WORD ENDPOINT
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

// GET TODAY'S WORDS ENDPOINT
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
    const todaysDate = "2024-10-03";

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

    if (!findWords || findWords.length === 0) {
      return res.status(200).json({ todaysWords: [] });
    }
    // With the wordIds from findWords, search for the correponding Word and Translation in words collection
    const wordIds = findWords.map((word) => word.word_id);
    const wordsList = await mongoose.connection
      .collection("words")
      .find({ _id: { $in: wordIds } })
      .toArray();

    const todaysWords = wordsList.map((word) => ({
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

// GET CONTEXT ENDPOINT (will be used if wrong answer from user)
router.post("/getContext", authMiddleware, async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    const { word_id } = req.body;

    const word = await mongoose.connection.collection("userswords").findOne({
      $and: [
        { user_id: new mongoose.Types.ObjectId(user_id) },
        { word_id: new mongoose.Types.ObjectId(word_id) },
      ],
    });

    if (!word) {
      return res
        .status(404)
        .json({ message: "No word found with the given details" });
    }

    return res.status(200).json({ context: word.context });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching context", error });
  }
});

export default router;
