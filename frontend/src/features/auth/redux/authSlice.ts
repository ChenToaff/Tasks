import IUser from "@interfaces/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { login, logout, checkAuthStatus } from "./authActions";

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  error: string | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: undefined,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});
export default authSlice.reducer;
