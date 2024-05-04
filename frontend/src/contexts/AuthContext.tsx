import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Credentials } from "@customTypes/credentials";
import IPerson from "@interfaces/IPerson";
import { useUser } from "@hooks/useUser";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AuthService.checkAuthStatus().then((user) => {
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
