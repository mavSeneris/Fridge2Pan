import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../context/authContext";
import { auth } from "../firebase";

export default function AuthRequired({ children }) {
  // const isLoggedIn = localStorage.getItem("loggedin");
  // const currentUser = auth.currentUser;
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login?message=You must log in first." />;
  }
  return <Outlet />;
  return children;
}
