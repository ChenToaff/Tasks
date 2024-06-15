import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITask from "@interfaces/ITask";
import * as taskReducers from "./taskReducers";
import { loadProjectDetails } from "@features/project/redux/projectActions";
import { loadInitialTasks } from "./taskActions";

export interface TasksState {
  tasks: { [id: string]: ITask };
  loading: boolean;
  error: string | undefined;
}

const initialState: TasksState = {
  tasks: {},
  loading: false,
  error: undefined,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    ...taskReducers,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInitialTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.reduce(
          (acc: { [id: string]: ITask }, task: ITask) => {
            acc[task.id] = task;
            return acc;
          },
          {}
        );
        state.loading = false;
      })
      .addCase(loadInitialTasks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loadProjectDetails.fulfilled, (state, action) => {
        const newTasks = action.payload.taskColumns.flatMap((tc) => tc.tasks);
        newTasks.forEach((task) => {
          if (!state.tasks[task.id]) {
            state.tasks[task.id] = task;
          }
        });
      });
  },
});

export const { addTask, updateTask, removeTask, updateTaskColumn } =
  tasksSlice.actions;
export default tasksSlice.reducer;
