"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminMiddleware_1 = __importDefault(require("../middlewares/adminMiddleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.get("/getUsers", adminMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield mongoose_1.default.connection
            .collection("users")
            .find({})
            .toArray();
        const usersInfo = users.map((user) => ({
            user_id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }));
        return res.status(200).json({ usersInfo });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching users", error });
    }
}));
router.post("/createUser", adminMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create the new user
        const newUser = new User_1.default({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        yield newUser.save();
        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
}));
router.put("/updateUser", adminMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, username, email, password, role } = req.body; // Include user_id in the destructured body
        // Search for the user by user_id
        const user = yield User_1.default.findById(user_id); // Use findById to search for user by user_id
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update only if fields are provided
        if (username)
            user.username = username;
        if (email)
            user.email = email; // Update email if provided
        if (role)
            user.role = role;
        if (password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(password, salt);
        }
        yield user.save();
        return res
            .status(200)
            .json({ message: "User updated successfully", user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating user", error });
    }
}));
router.delete("/deleteUser", adminMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        // Search for the user by email and delete it
        const deletedUser = yield User_1.default.findOneAndDelete({ user_id });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "User deleted successfully", user: deletedUser });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
}));
exports.default = router;
