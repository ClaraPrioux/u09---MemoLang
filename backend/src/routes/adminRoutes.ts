import { Router, Request, Response } from "express";
import adminMiddleware from "../middlewares/adminMiddleware";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcryptjs";

interface AuthenticatedRequest extends Request {
  user?: string;
  role?: string;
}

const router = Router();

router.get(
  "/getUsers",
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const users = await mongoose.connection
        .collection("users")
        .find({})
        .toArray();
      const usersInfo = users.map((user) => ({
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      return res.status(200).json({ usersInfo });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching users", error });
    }
  }
);

router.post(
  "/createUser",
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      await newUser.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  }
);

router.put(
  "/updateUser",
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { username, email, password, role } = req.body;

      // Search for the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update only if fields are provided
      if (username) user.username = username;
      if (role) user.role = role;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  }
);

router.delete(
  "/deleteUser",
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { email } = req.body;

      // Search for the user by email and delete it
      const deletedUser = await User.findOneAndDelete({ email });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  }
);

export default router;
