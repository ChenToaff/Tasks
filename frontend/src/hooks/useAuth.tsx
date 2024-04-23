import { useContext } from "react";
import { AuthContext, AuthContextType } from "@contexts/AuthContext";

// Update the useAuth hook to throw an error if the context is null.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
