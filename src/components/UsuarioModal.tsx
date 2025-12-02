import React from "react";
import type { UsuarioBackend, UsuarioEditable } from "../interfaces/UsuarioBackend";

interface Props {
  show: boolean;
  usuario: UsuarioEditable | UsuarioBackend;
  setUsuario: (u: UsuarioEditable | UsuarioBackend) => void;
  errores: Record<string, string>;
  onSave: () => void;
  onClose: () => void;
}

export default function UsuarioModal({
  show,
  onClose,
  usuario,
  setUsuario,
  errores,
  onSave,
}: Props) {
  if (!show) return null;

  // rol actual (si no tiene, cliente por defecto)
  const rolActual = usuario.roles?.[0]?.idRol ?? 2;

  const handleRolChange = (idRol: number) => {
    setUsuario({
      ...usuario,
      roles: [
        {
          idRol,
          nomRol:
            idRol === 1
              ? "administrador"
              : idRol === 2
              ? "cliente"
              : "vendedor",
        },
      ],
    });
  };

  
  const titulo = usuario.idUsuario ? "Editar Usuario" : "Agregar Usuario";

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cardSimple p-3">
          <h5>{titulo}</h5>

          {[
            { label: "Nombre", field: "nomUsuario" },
            { label: "Apellido", field: "apeUsuario" },
            { label: "Correo", field: "correoUsuario", type: "email" },
            { label: "Contraseña", field: "passUsuario", type: "password" },
            { label: "Fecha de nacimiento", field: "fechaNacUsuario", type: "date" },
          ].map(({ label, field, type }) => (
            <div className="mb-2" key={field}>
              <label>{label}</label>
              <input
                type={type ?? "text"}
                className={`form-control ${errores[field] ? "is-invalid" : ""}`}
                value={String((usuario as any)[field] ?? "")}
                onChange={(e) =>
                  setUsuario({ ...usuario, [field]: e.target.value })
                }
              />
              {errores[field] && (
                <div className="invalid-feedback">{errores[field]}</div>
              )}
            </div>
          ))}

          {/* ROL */}
          <div className="mb-2">
            <label>Rol</label>
            <select
              className={`form-control ${errores.roles ? "is-invalid" : ""}`}
              value={rolActual}
              onChange={(e) => handleRolChange(Number(e.target.value))}
            >
              <option value={1}>Administrador</option>
              <option value={2}>Cliente</option>
              <option value={3}>Vendedor</option>
            </select>
            {errores.roles && <div className="invalid-feedback">{errores.roles}</div>}
          </div>

          {/* ESTADO  solo si estamos editando */}
          {usuario.idUsuario && (
            <div className="mb-2">
              <label>Estado</label>
              <select
                className="form-control"
                value={usuario.estadoUsuario}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    estadoUsuario: Number(e.target.value),
                  })
                }
              >
                <option value={1}>Activo</option>
                <option value={2}>Inactivo</option>
              </select>
            </div>
          )}

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary me-2" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={onSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
