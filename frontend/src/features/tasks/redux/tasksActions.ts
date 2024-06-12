// projectActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import TasksService from "../api/TasksService";

export const loadInitialTasks = createAsyncThunk(
  "tasks/loadInitial",
  async () => {
    return TasksService.getTasks();
  }
);
