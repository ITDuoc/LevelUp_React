import React from "react";
import type { Usuario } from "../services/usuariosService";


interface Props {
  usuarios: Usuario[];
  onEdit: (u: Usuario) => void;
  onDelete: (id: number) => void;
}

export default function UsuarioTable({ usuarios, onEdit, onDelete }: Props) {
  return (
    <div className="cardSimple p-3 mb-3">
      <div className="table-responsive">
        <table
          className="table table-dark table-striped mb-0"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "2px solid var(--color-morado)",
          }}
        >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => onEdit(u)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
