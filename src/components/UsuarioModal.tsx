import React from "react";
import type { Usuario } from "../services/usuariosService";

interface Props {
  show: boolean;
  usuario: Usuario | Omit<Usuario, "id">;
  setUsuario: (u: Usuario | Omit<Usuario, "id">) => void;
  errores: Record<string, string>;
  onSave: () => void;
  onClose: () => void;
}

export default function UsuarioModal({ show, onClose, usuario, setUsuario, errores, onSave }: Props) {
  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cardSimple p-3">
          <h5>{("id" in usuario) ? "Editar Usuario" : "Agregar Usuario"}</h5>

          {["nombre","apellido","correo","contrasenia","direccion","fecha_nac"].map(field => (
            <div className="mb-2" key={field}>
              <label>{field === "contrasenia" ? "Contraseña" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "fecha_nac" ? "date" : field === "correo" ? "email" : field === "contrasenia" ? "password" : "text"}
                className={`form-control ${errores[field] ? "is-invalid" : ""}`}
                value={usuario[field as keyof typeof usuario] as string}
                onChange={e => setUsuario({ ...usuario, [field]: e.target.value })}
              />
              {errores[field] && <div className="invalid-feedback">{errores[field]}</div>}
            </div>
          ))}

          {/* Rol */}
          <div className="mb-2">
            <label>Rol</label>
            <select
              className={`form-control ${errores.rol ? "is-invalid" : ""}`}
              value={usuario.rol}
              onChange={e => setUsuario({ ...usuario, rol: e.target.value as Usuario["rol"] })}
            >
              <option value="">Seleccionar rol</option>
              <option value="cliente">Cliente</option>
              <option value="vendedor">Vendedor</option>
              <option value="administrador">Administrador</option>
            </select>
            {errores.rol && <div className="invalid-feedback">{errores.rol}</div>}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={onSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
