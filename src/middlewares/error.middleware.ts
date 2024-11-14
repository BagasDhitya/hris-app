import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export class ErrorHandler {
  public handleError(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`[Error] ${statusCode}: ${message}`);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
}
