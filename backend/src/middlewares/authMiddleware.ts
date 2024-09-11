import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const secretKey = process.env.SECRET_KEY!;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = (decoded as { id: string }).id; // Attach the user ID to the request
    next();
  } catch {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;

// This has been tested with Insomnia on a testRoute that I won't push on Github.
