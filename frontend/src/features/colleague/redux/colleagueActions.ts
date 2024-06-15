import { createAsyncThunk } from "@reduxjs/toolkit";
import ColleagueService from "../api/ColleagueService";

export const loadInitialColleagues = createAsyncThunk(
  "colleagues/loadInitial",
  async () => {
    return ColleagueService.fetchColleagues();
  }
);
