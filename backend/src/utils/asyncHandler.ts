import { Request, Response, NextFunction } from "express";

export default function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(function (err) {
      next(err);
    });
  };
}
