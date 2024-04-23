import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ApiError) {
    res.status(error.statusCode).send(error.message);
  } else if (error instanceof Error) {
    res.status(500).send(error.message); // Default to 500 if error is not an ApiError
  } else {
    res.status(500).send("An unknown error occurred");
  }
}
