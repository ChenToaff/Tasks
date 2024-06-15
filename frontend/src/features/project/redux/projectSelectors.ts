// src/features/projects/selectors/projectSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

export const selectProjectById = createSelector(
  [
    (state: RootState) => state.projects.data,
    (state, projectId: string) => projectId,
  ],
  (projects, projectId) => projects.find((project) => project.id === projectId)
);
