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

          {/* Nombre */}
          <div className="mb-2">
            <label>Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
              value={usuario.nombre}
              onChange={e => setUsuario({ ...usuario, nombre: e.target.value })}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          {/* Apellido */}
          <div className="mb-2">
            <label>Apellido</label>
            <input
              type="text"
              className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
              value={usuario.apellido}
              onChange={e => setUsuario({ ...usuario, apellido: e.target.value })}
            />
            {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
          </div>

          {/* Correo */}
          <div className="mb-2">
            <label>Correo</label>
            <input
              type="email"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              value={usuario.correo}
              onChange={e => setUsuario({ ...usuario, correo: e.target.value })}
            />
            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
          </div>

          {/* Contraseña */}
          <div className="mb-2">
            <label>Contraseña</label>
            <input
              type="password"
              className={`form-control ${errores.contrasenia ? "is-invalid" : ""}`}
              value={usuario.contrasenia}
              onChange={e => setUsuario({ ...usuario, contrasenia: e.target.value })}
            />
            {errores.contrasenia && <div className="invalid-feedback">{errores.contrasenia}</div>}
          </div>

          {/* Dirección */}
          <div className="mb-2">
            <label>Dirección</label>
            <input
              type="text"
              className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
              value={usuario.direccion}
              onChange={e => setUsuario({ ...usuario, direccion: e.target.value })}
            />
            {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
          </div>

          {/* Fecha de nacimiento */}
          <div className="mb-2">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              className={`form-control ${errores.fecha_nac ? "is-invalid" : ""}`}
              value={usuario.fecha_nac}
              onChange={e => setUsuario({ ...usuario, fecha_nac: e.target.value })}
            />
            {errores.fecha_nac && <div className="invalid-feedback">{errores.fecha_nac}</div>}
          </div>

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

          {/* Botones */}
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={onSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
