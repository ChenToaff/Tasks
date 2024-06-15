import { useContext } from "react";
import {
  SelectedTaskContext,
  SelectedTaskContextType,
} from "@features/task/contexts/SelectedTaskContext";

// Update the useAuth hook to throw an error if the context is null.
export const useSelectedTask = (): SelectedTaskContextType => {
  const context = useContext(SelectedTaskContext)!;

  return context;
};
