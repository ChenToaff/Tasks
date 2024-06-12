import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMoreColleagues,
  fetchMoreProjects,
  fetchMoreTasks,
} from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    projects: { data: [], loading: false, error: null, loadedCount: 0 },
    tasks: { data: [], loading: false, error: null, loadedCount: 0 },
    colleagues: { data: [], loading: false, error: null, loadedCount: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Projects
    builder
      .addCase(fetchMoreProjects.pending, (state) => {
        state.projects.loading = true;
      })
      .addCase(fetchMoreProjects.fulfilled, (state, action) => {
        state.projects.data = state.projects.data.concat(action.payload);
        state.projects.loadedCount += action.payload.length;
        state.projects.loading = false;
      })
      .addCase(fetchMoreProjects.rejected, (state, action) => {
        state.projects.loading = false;
        state.projects.error = action.error.message;
      });
    // Tasks
    builder
      .addCase(fetchMoreTasks.pending, (state) => {
        state.tasks.loading = true;
      })
      .addCase(fetchMoreTasks.fulfilled, (state, action) => {
        state.tasks.data = state.tasks.data.concat(action.payload);
        state.tasks.loadedCount += action.payload.length;
        state.tasks.loading = false;
      })
      .addCase(fetchMoreTasks.rejected, (state, action) => {
        state.tasks.loading = false;
        state.tasks.error = action.error.message;
      });
    // users
    builder
      .addCase(fetchMoreColleagues.pending, (state) => {
        state.colleagues.loading = true;
      })
      .addCase(fetchMoreColleagues.fulfilled, (state, action) => {
        state.colleagues.data = state.colleagues.data.concat(action.payload);
        state.colleagues.loadedCount += action.payload.length;
        state.colleagues.loading = false;
      })
      .addCase(fetchMoreColleagues.rejected, (state, action) => {
        state.colleagues.loading = false;
        state.colleagues.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
