import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "@features/auth/hooks/useAuth";

const CheckAuthStatus: React.FC = () => {
  const { checkStatus } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkStatus();
  }, [location]);

  return null;
};

export default CheckAuthStatus;
