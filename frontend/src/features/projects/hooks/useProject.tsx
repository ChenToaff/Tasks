import { useContext } from "react";
import {
  ProjectPageContext,
  ProjectPageContextType,
} from "@features/projects/contexts/ProjectPageContext";

// Update the useAuth hook to throw an error if the context is null.
export const useProject = (): ProjectPageContextType => {
  const context = useContext(ProjectPageContext)!;

  return context;
};
