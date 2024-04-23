import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as authService from "../services/authService";
import * as peopleService from "../services/peopleService";
import IPerson from "../interfaces/IPerson";

// for req.user to use the IPerson
declare global {
  namespace Express {
    interface User extends IPerson {}
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

passport.serializeUser((user: IPerson, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await peopleService.findPersonById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
