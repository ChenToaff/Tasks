import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

// Selector to get tasks by project ID
export const selectTasksByProjectId = createSelector(
  [
    (state: RootState, projectId: string) => state.tasks.tasks,
    (state, projectId) => projectId,
  ],
  (tasks, projectId) => {
    return Object.values(tasks).filter((task) => task.projectId === projectId);
  }
);

// Selector to check if tasks for a project are already loaded
export const areTasksLoadedForProject = createSelector(
  selectTasksByProjectId,
  (tasks) => tasks.length > 0
);

// Selector to get tasks by assignee
export const selectTasksByAssignee = createSelector(
  [
    (state: RootState, assignee: string) => state.tasks.tasks,
    (state, assignee) => assignee,
  ],
  (tasks, assignee) => {
    return Object.values(tasks).filter((task) => task.assignedTo === assignee);
  }
);
