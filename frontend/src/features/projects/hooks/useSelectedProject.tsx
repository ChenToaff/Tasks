import { useContext } from "react";
import {
  SelectedProjectContext,
  SelectedProjectContextType,
} from "@features/projects/contexts/SelectedProjectContext";

// Update the useAuth hook to throw an error if the context is null.
export const useSelectedProject = (): SelectedProjectContextType => {
  const context = useContext(SelectedProjectContext)!;

  return context;
};
