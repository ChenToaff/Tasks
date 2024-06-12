import React, { createContext, useMemo, useState } from "react";
import ITask from "@interfaces/ITask";

export interface SelectedTaskContextType {
  selectedTask: ITask | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

export const SelectedTaskContext =
  createContext<SelectedTaskContextType | null>(null);

export const SelectedTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const contextValue = useMemo(
    () => ({
      selectedTask,
      setSelectedTask,
    }),
    [selectedTask]
  );

  return (
    <SelectedTaskContext.Provider value={contextValue}>
      {children}
    </SelectedTaskContext.Provider>
  );
};
