"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig")); // Import the connectDB function
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const wordsRoutes_1 = __importDefault(require("./routes/wordsRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
(0, dbConfig_1.default)().then(() => {
    // Start the server only after a successful connection
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
// Allow requests from your frontend
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// All the routes
app.use("/auth", authRoutes_1.default);
app.use("/word", wordsRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
