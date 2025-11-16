import React from "react";
import type { Seccion } from "../hooks/useSeccion";
import { NavLink } from "react-router-dom";

interface Props {}

export default function Sidebar({}: Props) {
  return (
    <div
      className="cardSimple p-3"
      style={{
        width: "200px",
        backgroundColor: "#1e1e1e",
        borderRight: "2px solid #510080",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <NavLink
        to="/admin/dashboard"
        className="btn btn-primary w-100"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/usuarios"
        className="btn btn-primary w-100"
      >
        Gestión Usuarios
      </NavLink>
      <NavLink
        to="/admin/productos"
        className="btn btn-primary w-100"
      >
        Gestión Productos
      </NavLink>
    </div>
  );
}
