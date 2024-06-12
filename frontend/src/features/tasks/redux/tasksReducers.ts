import { PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "./tasksSlice";
import ITask from "@interfaces/ITask";
import ChangeTaskLocationProps from "@customTypes/changeTaskLocationProps";

export function setTasks(state: TasksState, action: PayloadAction<ITask[]>) {
  state.tasks = action.payload;
}

export function addTask(state: TasksState, action: PayloadAction<ITask>) {
  state.tasks.unshift(action.payload);
}

export function updateTask(state: TasksState, action: PayloadAction<ITask>) {
  const index = state.tasks.findIndex((t) => t.id === action.payload.id);
  if (index !== -1) {
    state.tasks[index] = action.payload;
  }
}

export function updateTaskColumn(
  state: TasksState,
  action: PayloadAction<ChangeTaskLocationProps>
) {
  const { destColumnId, taskId } = action.payload;
  const index = state.tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    state.tasks[index] = { ...state.tasks[index], taskColumnId: destColumnId };
  }
}
export function removeTask(state: TasksState, action: PayloadAction<string>) {
  state.tasks = state.tasks.filter((t) => t.id !== action.payload);
}
