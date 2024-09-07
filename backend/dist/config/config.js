"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || "mongodb://localhost:27017/MemoLang",
    secret_key: process.env.SECRET_KEY || "defaultsecretkey",
};