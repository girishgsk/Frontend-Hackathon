import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsNotAuthenticated = () => {
  const userData = localStorage.getItem("user");
  // console.log(userData);
  if (userData) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default IsNotAuthenticated;
