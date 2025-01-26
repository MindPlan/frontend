import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "~store/auth.store";

export const RedirectPage = () => {
  const {isAuthenticated} = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace/>;
  }
  
  return <Navigate to="/" replace/>
}
