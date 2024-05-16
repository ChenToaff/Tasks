import React, { createContext, useMemo, useState } from "react";
import ITask from "@interfaces/ITask";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export interface SelectedProjectContextType {
  projectTasks: ITask[];
}

export const SelectedProjectContext =
  createContext<SelectedProjectContextType | null>(null);

export const ProjectPageProvider = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) => {
  // Get tasks from the Redux store and filter them by projectId
  const projectTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.projectId === projectId)
  );

  const contextValue = useMemo(
    () => ({
      projectTasks,
    }),
    [projectTasks]
  );

  return (
    <SelectedProjectContext.Provider value={contextValue}>
      {children}
    </SelectedProjectContext.Provider>
  );
};
