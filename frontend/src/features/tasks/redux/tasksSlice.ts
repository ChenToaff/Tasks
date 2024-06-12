import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITask from "@interfaces/ITask";
import * as taskReducers from "./tasksReducers";
import { loadProjectDetails } from "@features/projects/redux/projectsActions";
import { loadInitialTasks } from "./tasksActions";
export interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | undefined;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: undefined,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: taskReducers,
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(loadInitialTasks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loadProjectDetails.fulfilled, (state, action) => {
        // Merge tasks from the project into the existing tasks, avoiding duplicates
        const newTasks = action.payload.taskColumns.flatMap((tc) => tc.tasks);
        const existingIds = new Set(state.tasks.map((t) => t.id));
        state.tasks = [
          ...state.tasks,
          ...newTasks.filter((t) => !existingIds.has(t.id)),
        ];
      });
    // Handle pending and rejected cases if necessary
  },
});

export const { setTasks, addTask, updateTask, removeTask, updateTaskColumn } =
  tasksSlice.actions;
export default tasksSlice.reducer;
