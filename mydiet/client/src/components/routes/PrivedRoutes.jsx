import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivedRoutes({children}) {
const token=localStorage.getItem("token");
const isBanned = localStorage.getItem("isBanned");
const isDoctor = localStorage.getItem("isDoctor");
const isAdmin = localStorage.getItem("isAdmin");
const isUser = localStorage.getItem("isUser");
const doctorID=localStorage.getItem("doctorID")

if (
  (token && isBanned === "false" && isUser === "true" && isAdmin === "false") ||
  (doctorID && token && isBanned === "false" && isDoctor === "true" && isAdmin === "false") ||
  (token && isBanned === "false" && isAdmin === "true")){
    return children
  }else{
    return <Navigate to="/auth"/>
  }
  
}

export default PrivedRoutes
