import { Router } from "express";
import { getExamples, createExample } from "../controllers/exampleController";

const router: Router = Router();

router.get("/", getExamples);
router.post("/", createExample);

export default router;
