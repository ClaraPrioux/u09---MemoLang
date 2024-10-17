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

export default router;
