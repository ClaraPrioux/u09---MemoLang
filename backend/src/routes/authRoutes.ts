import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();
const secretKey = process.env.SECRET_KEY!;
// Register route

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hassh the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to MongoDB
    await newUser.save();

    // Generate the token
    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
