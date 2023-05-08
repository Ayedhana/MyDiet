import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoutes({ children }) {
  const token = localStorage.getItem("token");
  
  

  if (token) {
    return <Navigate to="/" />;
    
  } else {
    return children;
  }
}

export default AuthRoutes;
