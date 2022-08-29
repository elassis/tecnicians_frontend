import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes(){
  const state = useSelector(state => state.user);
  return (
    state.length > 0 ? <Outlet /> : <Navigate to="/Login" />
  )
}

export default PrivateRoutes;