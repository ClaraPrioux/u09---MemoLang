import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const secretKey = process.env.SECRET_KEY!;

const router = express.Router();

interface DecodedToken {
  id: string;
}

router.get("/getUser", async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }
    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;

    // Convert user_id to ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(user_id);

    const user = await mongoose.connection
      .collection("users")
      .findOne({ _id: objectIdUser });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Return the user's informations
    const userInfo = {
      username: user.username,
    };

    return res.status(200).json({ userInfo });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error });
  }
});

router.get("/getWords", async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
    const user_id = decodedToken.id;
    const objectIdUser = new mongoose.Types.ObjectId(user_id);

    // Fetch user words (based on user_id)
    const userWords = await mongoose.connection
      .collection("userswords")
      .find({ user_id: objectIdUser })
      .toArray();

    if (!userWords || userWords.length === 0) {
      return res
        .status(404)
        .json({ message: "User hasn't added any words yet!" });
    }

    // Extract word_ids from userWords to find corresponding word details
    const wordIds = userWords.map((word) => word.word_id);

    // Fetch actual word details from the words collection using the word_ids
    const words = await mongoose.connection
      .collection("words")
      .find({
        _id: { $in: wordIds.map((id) => new mongoose.Types.ObjectId(id)) },
      })
      .toArray();

    if (!words || words.length === 0) {
      return res.status(404).json({ message: "No words found for the user!" });
    }

    return res.status(200).json({ words });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user words", error });
  }
});

router.get("/getWordsCreatedPerWeek", async (req, res) => {
  try {
    // Extract the user_id from the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decodedToken = jwt.verify(token, secretKey) as { id: string };
    const user_id = decodedToken.id;
    const objectIdUser = new mongoose.Types.ObjectId(user_id);

    // Get words created by the user and group them by week
    const wordsPerWeek = await mongoose.connection
      .collection("userswords")
      .aggregate([
        { $match: { user_id: objectIdUser } },
        {
          $group: {
            _id: { $week: "$creation_date" },
            wordCount: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return res.status(200).json({ wordsPerWeek });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user's words", error });
  }
});

export default router;
