import React from "react";
import { useAdminUsuarios } from "../hooks/useAdminUsuarios";
import UsuarioModal from "../components/UsuarioModal";
import type { UsuarioBackend, UsuarioEditable } from "../interfaces/UsuarioBackend";

export default function AdminUsuarios() {
  const {
    usuarios,
    showModal,
    editUsuario,
    nuevoUsuario,
    errores,
    setNuevoUsuario,
    setEditUsuario,
    setShowModal,
    handleAgregar,
    handleGuardar,
    handleEliminar,
    openModalNuevo,
    openModalEditar,
  } = useAdminUsuarios();

  
  const mostrarEstado = (estado: number) => {
    return estado === 1 ? "Activo" : "Inactivo";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      <button className="btn btn-primary mb-3" onClick={openModalNuevo}>
        Agregar Usuario
      </button>

      <div className="cardSimple p-3 mb-3">
        <div className="table-responsive">
          <table className="table table-dark table-striped mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u: UsuarioBackend) => (
                <tr key={u.idUsuario}>
                  <td>{u.nomUsuario}</td>
                  <td>{u.apeUsuario}</td>
                  <td>{u.correoUsuario}</td>
                  <td>{u.roles?.[0]?.nomRol ?? `rol:${u.roles?.[0]?.idRol ?? "?"}`}</td>
                  <td>{mostrarEstado(u.estadoUsuario)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => openModalEditar(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(u.idUsuario!)}
                      disabled={u.estadoUsuario === 2} 
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UsuarioModal
        show={showModal}
        onClose={() => setShowModal(false)}
        usuario={editUsuario ?? nuevoUsuario}
        setUsuario={(u: UsuarioEditable) => {
          if (editUsuario) {
            setEditUsuario(u);
          } else {
            setNuevoUsuario(u);
          }
        }}
        errores={errores}
        onSave={editUsuario ? handleGuardar : handleAgregar}
      />
    </div>
  );
}
