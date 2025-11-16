import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

import Inicio from "../pages/Inicio";
import Productos from "../pages/Productos";
import Blog from "../pages/blog";
import Cuenta from "../pages/Cuenta";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import PanelAdmin from "../pages/PanelAdmin";
import Carrito from "../pages/Carrito";
import PagoRealizado from "../components/PagoRealizado";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas dentro del layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago-realizado" element={<PagoRealizado />} />

          {/* Panel de administrador con subrutas */}
          <Route path="/admin/*" element={<PanelAdmin />} />
        </Route>

        {/* Rutas fuera del layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
