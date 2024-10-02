import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string;
  role?: string;
}

const adminMiddleware = (
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
    req.user = (decoded as { id: string }).id;
    req.role = (decoded as { role: string }).role;

    // Check if the user is an admin
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    next();
  } catch {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default adminMiddleware;
