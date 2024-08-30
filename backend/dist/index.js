"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default
    .connect(config_1.default.mongodb_uri, {})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});
// Define your routes here
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
app.use("/api/example", exampleRoutes_1.default);
// Start the server
app.listen(config_1.default.port, () => {
    console.log(`Server is running on port ${config_1.default.port}`);
});
