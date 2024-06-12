import { Request, Response, NextFunction } from "express";
import passport from "passport";
import IUser from "../interfaces/IUser";

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    async (err: any, user: IUser, info: { message: string }) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({
          message: "Logged in successfully",
          user: { id: user.id, username: user.username, name: user.name },
        });
      });
    }
  )(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.send({ message: "Failed to log out", error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.send({ message: "Failed to destroy session", error: err });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully." });
    });
  });
};

export const checkStatus = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = req.user as IUser;
    res.json({
      message: "User is logged in",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        projects: user.projects,
      },
    });
  } else {
    res.status(401).json({ message: "User is not logged in" });
  }
};
