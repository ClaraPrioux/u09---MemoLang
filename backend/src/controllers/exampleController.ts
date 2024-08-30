import {
  getExamples as fetchExamples,
  createExample as addExample,
} from "../services/exampleService";
import { Request, Response } from "express";

// Controller functions
export const getExamples = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const examples = await fetchExamples();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createExample = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const newExample = await addExample(name);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
