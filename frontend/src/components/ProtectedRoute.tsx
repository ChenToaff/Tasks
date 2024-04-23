import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or use a better loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};
export default ProtectedRoute;
