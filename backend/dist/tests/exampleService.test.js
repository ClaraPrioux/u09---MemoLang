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
const exampleService_1 = require("../services/exampleService");
test("should return examples", () => __awaiter(void 0, void 0, void 0, function* () {
    const examples = yield (0, exampleService_1.getExamples)();
    expect(examples).toBeDefined();
}));
test("should create a new example", () => __awaiter(void 0, void 0, void 0, function* () {
    const example = yield (0, exampleService_1.createExample)("Test Name");
    expect(example.name).toBe("Test Name");
}));
