import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import AdminUsuarios from "./AdminUsuarios";
import AdminProductos from "./AdminProductos";

export default function PanelAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "calc(100vh - 60px)" }}>
      <Sidebar />

      <div className="flex-fill p-3">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="productos" element={<AdminProductos />} />
        </Routes>
      </div>
    </div>
  );
}
