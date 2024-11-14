import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export class AuthenticateMiddleware {
  async authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token: any = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access token is missing or invalid" });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }
}
