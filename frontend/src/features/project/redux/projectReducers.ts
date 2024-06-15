import IProject from "@interfaces/IProject";
import ITask from "@interfaces/ITask";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectsState } from "./projectSlice";
import ChangeTaskLocationProps from "@customTypes/changeTaskLocationProps";

export function addProject(
  state: ProjectsState,
  action: PayloadAction<IProject>
) {
  state.data.push(action.payload);
}

export function updateProject(
  state: ProjectsState,
  action: PayloadAction<IProject>
) {
  const index = state.data.findIndex((p) => p.id === action.payload.id);
  if (index !== -1) {
    state.data[index] = action.payload;
  }
}

export function removeProject(
  state: ProjectsState,
  action: PayloadAction<string>
) {
  state.data = state.data.filter((p) => p.id !== action.payload);
}

// Reducer for adding a task to a project
export function addTaskToProject(
  state: ProjectsState,
  action: PayloadAction<ITask>
) {
  const task = action.payload;
  if (task.projectId) {
    const projectIndex = state.data.findIndex((p) => p.id === task.projectId);
    if (projectIndex !== -1) {
      const project = state.data[projectIndex];
      const columnIndex = project.taskColumns.findIndex(
        (tc) => tc.id === task.taskColumnId
      );
      if (columnIndex !== -1) {
        project.taskColumns[columnIndex].tasks.unshift(task);
      }
    }
  }
}

export function updateTaskInProject(
  state: ProjectsState,
  action: PayloadAction<ITask>
) {
  const taskToUpdate = action.payload;
  const projectIndex = state.data.findIndex(
    (p) => p.id === taskToUpdate.projectId
  );

  if (projectIndex !== -1) {
    const project = state.data[projectIndex];
    const columnIndex = project.taskColumns.findIndex(
      (tc) => tc.id === taskToUpdate.taskColumnId
    );
    if (columnIndex !== -1) {
      const taskIndex = project.taskColumns[columnIndex].tasks.findIndex(
        (t) => t.id === taskToUpdate.id
      );

      if (taskIndex !== -1) {
        project.taskColumns[columnIndex].tasks[taskIndex] = taskToUpdate;
      }
    }
  }
}

export function changeTaskLocation(
  state: ProjectsState,
  action: PayloadAction<ChangeTaskLocationProps>
) {
  const { taskId, projectId, destColumnId, sourceColumnId, position } =
    action.payload;
  const projectIndex = state.data.findIndex((p) => p.id === projectId);
  if (projectIndex !== -1) {
    const project = state.data[projectIndex];
    const sourceColumn = project.taskColumns.find(
      (tc) => tc.id === sourceColumnId
    );
    const destColumn = project.taskColumns.find((tc) => tc.id === destColumnId);

    if (!sourceColumn || !destColumn) {
      return;
    }

    const taskIndex = sourceColumn.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return;
    }

    const [task] = sourceColumn.tasks.splice(taskIndex, 1);

    task.taskColumnId = destColumnId;
    destColumn.tasks.splice(position, 0, task);
  }
}

export function removeTaskFromProject(
  state: ProjectsState,
  action: PayloadAction<ITask>
) {
  const task = action.payload;
  const projectIndex = state.data.findIndex((p) => p.id === task.projectId);
  if (projectIndex !== -1) {
    const columnIndex = state.data[projectIndex].taskColumns.findIndex(
      (tc) => tc.id === task.taskColumnId
    );
    if (columnIndex !== -1) {
      state.data[projectIndex].taskColumns[columnIndex].tasks = state.data[
        projectIndex
      ].taskColumns[columnIndex].tasks.filter((t) => t.id !== task.id);
    }
  }
}
