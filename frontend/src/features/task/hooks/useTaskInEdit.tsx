import { useContext } from "react";
import {
  TaskInEditContext,
  TaskInEditContextType,
} from "@features/task/contexts/TaskInEditContext";

// Update the useAuth hook to throw an error if the context is null.
export const useTaskInEdit = (): TaskInEditContextType => {
  const context = useContext(TaskInEditContext)!;

  return context;
};
