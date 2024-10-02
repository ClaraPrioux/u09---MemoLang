import { Router, Request, Response } from "express";
import adminMiddleware from "../middlewares/adminMiddleware";

interface AuthenticatedRequest extends Request {
  user?: string;
  role?: string;
}

const router = Router();

// Test admin route
router.get(
  "/test",
  adminMiddleware,
  (req: AuthenticatedRequest, res: Response) => {
    res
      .status(200)
      .json({ message: "Welcome, Admin!", userId: req.user, role: req.role });
  }
);

export default router;
