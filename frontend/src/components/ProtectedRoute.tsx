import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
