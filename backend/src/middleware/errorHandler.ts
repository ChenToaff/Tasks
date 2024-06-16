import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
}
