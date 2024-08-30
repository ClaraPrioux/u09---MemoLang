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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExample = exports.getExamples = void 0;
const exampleService_1 = require("../services/exampleService");
// Controller functions
const getExamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examples = yield (0, exampleService_1.getExamples)();
        res.json(examples);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getExamples = getExamples;
const createExample = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newExample = yield (0, exampleService_1.createExample)(name);
        res.json(newExample);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createExample = createExample;
