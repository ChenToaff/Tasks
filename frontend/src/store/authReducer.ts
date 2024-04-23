import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface authState {
  isAuthenticated: boolean;
}

const initialState: authState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
