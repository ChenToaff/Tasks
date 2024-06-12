import { createSlice } from "@reduxjs/toolkit";
import { loadInitialColleagues } from "./colleagueActions";
import IUser from "@interfaces/IUser";
import * as colleagueReducers from "./colleaguesReducers";

export interface ColleaguesState {
  data: { [id: string]: IUser };
  loading: Boolean;
  error: string | undefined;
}

const initialState: ColleaguesState = {
  data: {},
  loading: false,
  error: undefined,
};

const colleagueSlice = createSlice({
  name: "colleagues",
  initialState,
  reducers: colleagueReducers,
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialColleagues.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialColleagues.fulfilled, (state, action) => {
        state.data = action.payload.reduce(
          (acc: { [id: string]: IUser }, colleague: IUser) => {
            acc[colleague.id] = colleague;
            return acc;
          },
          {}
        );
        state.loading = false;
      })
      .addCase(loadInitialColleagues.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addColleague, updateColleague, removeColleagues } =
  colleagueSlice.actions;

export default colleagueSlice.reducer;
