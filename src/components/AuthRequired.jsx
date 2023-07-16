import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function AuthRequired({ children }) {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login?message=You must log in first." />;
  }
  return <Outlet /> || children;
}
