import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import IUser from "../interfaces/IUser";

// for req.user to use the IUser
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await authService.authenticateUser(username, password);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
