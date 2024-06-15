// projectActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";
import { Credentials } from "@customTypes/credentials";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials) => {
    return AuthService.login(credentials);
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    return AuthService.checkAuthStatus();
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return AuthService.logout();
});
