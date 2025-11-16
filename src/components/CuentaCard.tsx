import React from "react";
import type { Cliente } from "../services/interfaces";

interface Props {
  cliente: Cliente;
  onEditar: () => void;
}

export default function CuentaCard({ cliente, onEditar }: Props) {
  return (
    <div className="cardSimple shadow p-4 mb-4 d-flex flex-column flex-md-row align-items-start w-100">
      <div className="d-flex flex-column align-items-center me-md-4 mb-3 mb-md-0" style={{ minWidth: 200 }}>
        <img
          src={cliente.imagen_cliente || "/images/default-user.png"}
          alt="Foto de perfil"
          style={{ width: 150, height: 150, borderRadius: "50%", marginBottom: "1rem", objectFit: "cover" }}
        />
        <h5>{cliente.nombre_cliente} {cliente.apellido_cliente}</h5>
        <button className="btn btn-primary mt-2" onClick={onEditar}>
          Editar Perfil
        </button>
      </div>

      <div className="d-flex flex-wrap flex-grow-1">
        <div className="me-4 mb-3" style={{ minWidth: 200 }}>
          <p><strong>Correo:</strong> {cliente.correo_cliente}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono || "-"}</p>
        </div>
        <div className="me-4 mb-3" style={{ minWidth: 200 }}>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
          <p><strong>Fecha de Nacimiento:</strong> {cliente.fecha_nac_cliente}</p>
        </div>
      </div>
    </div>
  );
}
