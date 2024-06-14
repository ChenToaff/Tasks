import React, { createContext, useState, useEffect } from "react";
import AuthService from "../api/AuthService";
import { Credentials } from "@customTypes/credentials";
import IUser from "@interfaces/IUser";
import store from "../../../store";
// import { setProjects } from "@features/projects/redux/projectsReducer";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AuthService.checkAuthStatus().then((user) => {
      // store.dispatch(setProjects(user?.projects));
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });
  }, []);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    const _user = await AuthService.login(credentials);
    if (_user) {
      setUser(_user);
    }
    setIsAuthenticated(!!_user);
    setLoading(false);
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
