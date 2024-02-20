import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const user = document.cookie.includes("user_email");
  const token = document.cookie.includes("XSRF-TOKEN");
  return user && token ? <Outlet /> : <Navigate to="/Login" />;
}

export default PrivateRoutes;
