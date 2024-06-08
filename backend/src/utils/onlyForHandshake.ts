import { Request, Response, NextFunction } from "express";

function onlyForHandshake(
  middleware: (req: Request, res: Response, next: NextFunction) => void
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const isHandshake = (req as any)._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
}

export default onlyForHandshake;
