import { createSelector } from "@reduxjs/toolkit";
import { TasksState } from "./tasksSlice";

// Selector to get tasks by project ID
export const selectTasksByProjectId = createSelector(
  [
    (state: TasksState, projectId: string) => state.tasks,
    (state, projectId) => projectId,
  ],
  (tasks, projectId) => tasks.filter((task) => task.projectId === projectId)
);

// Selector to check if tasks for a project are already loaded
export const areTasksLoadedForProject = createSelector(
  selectTasksByProjectId,
  (tasks) => tasks.length > 0
);

// Selector to get tasks by assignee
export const selectTasksByAssignee = createSelector(
  [
    (state: TasksState, assignee: string) => state.tasks,
    (state, assignee) => assignee,
  ],
  (tasks, assignee) => tasks.filter((task) => task.assignedTo === assignee)
);
