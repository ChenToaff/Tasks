// projectActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../api/TaskService";

export const loadInitialTasks = createAsyncThunk(
  "tasks/loadInitial",
  async () => {
    return TaskService.getTasks();
  }
);
