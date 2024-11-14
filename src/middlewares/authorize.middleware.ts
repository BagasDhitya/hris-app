import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export class AuthorizationMiddleware {
  authorizeRole(requiredRole: string): any {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({
          message: "You do not have permission to access this resource",
        });
      }
      next();
    };
  }
}
