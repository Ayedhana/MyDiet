import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import PublicNavbar from "../navbar/PublicNavbar";
import Footer from "./footer/Footer";

export default function PublicLayout() {
  return (
    <div>
      <PublicNavbar/>
      <Outlet />
      <Footer/>
    </div>
  );
}
