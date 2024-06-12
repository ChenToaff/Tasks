import React, { createContext, useEffect, useMemo, useState } from "react";
import ITask from "@interfaces/ITask";

export interface TaskInEditContextType {
  taskInEdit: ITask | null;
  setTaskInEdit: React.Dispatch<React.SetStateAction<ITask | null>>;
}

export const TaskInEditContext = createContext<TaskInEditContextType | null>(
  null
);

export const TaskInEditProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [taskInEdit, setTaskInEdit] = useState<ITask | null>(null);

  const contextValue = useMemo(
    () => ({
      taskInEdit,
      setTaskInEdit,
    }),
    [taskInEdit]
  );

  return (
    <TaskInEditContext.Provider value={contextValue}>
      {children}
    </TaskInEditContext.Provider>
  );
};
