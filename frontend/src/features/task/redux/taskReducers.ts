import { PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "./taskSlice";
import ITask from "@interfaces/ITask";
import ChangeTaskLocationProps from "@customTypes/changeTaskLocationProps";

export function setTasks(state: TasksState, action: PayloadAction<ITask[]>) {
  state.tasks = action.payload.reduce(
    (acc: { [id: string]: ITask }, task: ITask) => {
      acc[task.id] = task;
      return acc;
    },
    {}
  );
}

export function addTask(state: TasksState, action: PayloadAction<ITask>) {
  state.tasks[action.payload.id] = action.payload;
}

export function updateTask(state: TasksState, action: PayloadAction<ITask>) {
  if (state.tasks[action.payload.id]) {
    state.tasks[action.payload.id] = action.payload;
  }
}

export function updateTaskColumn(
  state: TasksState,
  action: PayloadAction<ChangeTaskLocationProps>
) {
  const { destColumnId, taskId } = action.payload;
  if (state.tasks[taskId]) {
    state.tasks[taskId].taskColumnId = destColumnId;
  }
}

export function removeTask(state: TasksState, action: PayloadAction<string>) {
  delete state.tasks[action.payload];
}
