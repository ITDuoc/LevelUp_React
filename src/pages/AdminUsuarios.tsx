import React from "react";
import { useAdminUsuarios } from "../hooks/useAdminUsuarios";
import UsuarioModal from "../components/UsuarioModal";

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

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      <button className="btn btn-primary mb-3" onClick={openModalNuevo}>
        Agregar Usuario
      </button>

      <div className="cardSimple p-3 mb-3">
        <div className="table-responsive">
          <table className="table table-dark table-striped mb-0" style={{ borderRadius: "10px", overflow: "hidden", border: "2px solid var(--color-morado)" }}>
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
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => openModalEditar(u)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(u.id)}>Eliminar</button>
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
        setUsuario={u => editUsuario ? setEditUsuario(u as any) : setNuevoUsuario(u as any)}
        errores={errores}
        onSave={editUsuario ? handleGuardar : handleAgregar}
      />
    </div>
  );
}
