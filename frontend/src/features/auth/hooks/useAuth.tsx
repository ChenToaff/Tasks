import { useContext } from "react";
import {
  AuthContext,
  AuthContextType,
} from "@features/auth/contexts/AuthContext";

// Update the useAuth hook to throw an error if the context is null.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)!;

  return context;
};
