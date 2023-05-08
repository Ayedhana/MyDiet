import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import DoctorNavbar from "../navbar/DoctorNavbar";
import Footer from "./footer/Footer";


export default function DoctorLayout() {
  return (
    <div className="content">
      <DoctorNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
