import { useContext } from "react";
import {
  UserContext,
  UserContextType,
} from "@features/user/contexts/UserContext";

// Update the useAuth hook to throw an error if the context is null.
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)!;

  return context;
};
