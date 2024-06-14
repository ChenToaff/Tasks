import React, { createContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ITask from "@interfaces/ITask";
import { RootState } from "../../../store";
import { selectTaskById } from "@features/tasks/redux/tasksSelectors";

export interface SelectedTaskContextType {
  selectedTask: ITask | null;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedTaskContext =
  createContext<SelectedTaskContextType | null>(null);

export const SelectedTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask = useSelector((state: RootState) =>
    selectedTaskId ? selectTaskById(selectedTaskId)(state) : null
  );

  const contextValue = useMemo(
    () => ({
      selectedTask,
      setSelectedTaskId,
    }),
    [selectedTask, setSelectedTaskId]
  );

  return (
    <SelectedTaskContext.Provider value={contextValue}>
      {children}
    </SelectedTaskContext.Provider>
  );
};
