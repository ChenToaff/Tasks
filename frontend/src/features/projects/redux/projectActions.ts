// projectActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ProjectsService from "../api/ProjectsService";
import { RootState } from "../../../store";

export const loadInitialProjects = createAsyncThunk(
  "projects/loadInitial",
  async () => {
    return ProjectsService.fetchProjects(0, 10); // Load the first 10 projects initially
  }
);

export const loadMoreProjects = createAsyncThunk(
  "projects/loadMore",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { data } = state.projects;
    return ProjectsService.fetchProjects(data.length, 10); // Load more projects starting from the end of the current list
  }
);
