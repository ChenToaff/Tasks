import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthStatus,
  login,
  logout,
} from "@features/auth/redux/authActions";
import { RootState, AppDispatch } from "../../../store";
import { Credentials } from "@customTypes/credentials";
import IUser from "@interfaces/IUser";
import { useEffect } from "react";

interface UseAuthResult {
  isAuthenticated: boolean;
  user: IUser | null;
  error: string | undefined;
  loading: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
  checkStatus: () => void;
}

const useAuth = (): UseAuthResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const handleCheckStatus = () => {
    dispatch(checkAuthStatus());
  };

  const handleLogin = (credentials: Credentials) => {
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    error,
    loading,
    checkStatus: handleCheckStatus,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
