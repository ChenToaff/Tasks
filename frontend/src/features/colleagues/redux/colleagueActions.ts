import { createAsyncThunk } from "@reduxjs/toolkit";
import ColleaguesService from "../api/ColleaguesService";

export const loadInitialColleagues = createAsyncThunk(
  "colleagues/loadInitial",
  async () => {
    return ColleaguesService.fetchColleagues();
  }
);
