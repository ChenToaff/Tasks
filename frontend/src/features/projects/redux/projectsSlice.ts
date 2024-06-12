import { createSlice } from "@reduxjs/toolkit";
import IProject from "@interfaces/IProject";
import * as reducers from "./projectsReducers";
import {
  loadInitialProjects,
  loadMoreProjects,
  loadProjectDetails,
} from "./projectsActions";

export interface ProjectsState {
  data: IProject[];
  loading: boolean;
  error: string | undefined;
  canLoadMore: boolean;
}

const initialState: ProjectsState = {
  data: [],
  loading: false,
  error: undefined,
  canLoadMore: false,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: reducers,
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialProjects.fulfilled, (state, action) => {
        state.data = action.payload;
        state.canLoadMore = action.payload.length === 8;
        state.loading = false;
      })
      .addCase(loadInitialProjects.rejected, (state, action) => {
        state.error = action.error.message;
        state.canLoadMore = false;
        state.loading = false;
      })
      .addCase(loadMoreProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreProjects.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        state.canLoadMore = action.payload.length === 8;
        state.loading = false;
      })
      .addCase(loadMoreProjects.rejected, (state, action) => {
        state.error = action.error.message;
        state.canLoadMore = false;
        state.loading = false;
      })
      .addCase(loadProjectDetails.fulfilled, (state: ProjectsState, action) => {
        // Insert or update the project in the projects array
        const index = state.data.findIndex((p) => p.id === action.payload.id);
        action.payload.loaded = true;
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      });
  },
});

export const {
  addProject,
  updateProject,
  removeProject,
  addTaskToProject,
  updateTaskInProject,
  removeTaskFromProject,
  changeTaskLocation,
} = projectSlice.actions;
export default projectSlice.reducer;
