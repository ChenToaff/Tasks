import React, { createContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ITask from "@interfaces/ITask";
import { RootState } from "../../../store";
import { selectTaskById } from "@features/task/redux/taskSelectors";

export interface TaskInEditContextType {
  taskInEdit: ITask | null;
  setTaskInEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TaskInEditContext = createContext<TaskInEditContextType | null>(
  null
);

export const TaskInEditProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [taskInEditId, setTaskInEditId] = useState<string | null>(null);
  const taskInEdit = useSelector((state: RootState) =>
    taskInEditId ? selectTaskById(taskInEditId)(state) : null
  );

  const contextValue = useMemo(
    () => ({
      taskInEdit,
      setTaskInEditId,
    }),
    [taskInEdit, setTaskInEditId]
  );

  return (
    <TaskInEditContext.Provider value={contextValue}>
      {children}
    </TaskInEditContext.Provider>
  );
};
