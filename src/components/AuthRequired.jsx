import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthRequired() {
  // const isLoggedIn = localStorage.getItem("loggedin");
  const currentUser = auth.currentUser;

  console.log(currentUser)
  if (!currentUser) {
    return <Navigate to="/login?message=You must log in first." />;
  }
  return <Outlet />;
}
