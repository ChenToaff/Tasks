import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Credentials } from "@customTypes/credentials";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AuthService.checkAuthStatus().then((isAuth) => {
      setIsAuthenticated(isAuth);
      setLoading(false);
    });
  }, []);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    const isAuth = await AuthService.login(credentials);
    setIsAuthenticated(isAuth);
    setLoading(false);
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
