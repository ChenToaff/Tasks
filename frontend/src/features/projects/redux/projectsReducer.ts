import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { loadInitialProjects, loadMoreProjects } from "./projectActions";
import IProject from "@interfaces/IProject";

interface ProjectsState {
  data: IProject[];
  loading: Boolean;
  error: SerializedError | undefined;
  canLoadMore: Boolean;
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
  reducers: {
    addProject: (state: ProjectsState, action: PayloadAction<IProject>) => {
      state.data.unshift(action.payload);
    },
    updateProject: (state: ProjectsState, action: PayloadAction<IProject>) => {
      const index = state.data.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeProject: (state: ProjectsState, action: PayloadAction<string>) => {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialProjects.fulfilled, (state, action) => {
        state.data = action.payload;
        state.canLoadMore = action.payload.length === 10;
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
        state.canLoadMore = action.payload.length === 10;
        state.loading = false;
      })
      .addCase(loadMoreProjects.rejected, (state, action) => {
        state.error = action.error.message;
        state.canLoadMore = false;
        state.loading = false;
      });
  },
});

export const { addProject, updateProject, removeProject } =
  projectSlice.actions;

export default projectSlice.reducer;
