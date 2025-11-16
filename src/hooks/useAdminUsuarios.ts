import { useState, useEffect } from "react";
import type { Usuario } from "../services/usuariosService";
import { obtenerUsuarios, registrarUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuariosService";

export function useAdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editUsuario, setEditUsuario] = useState<Usuario | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, "id">>({
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    telefono: "",
    direccion: "",
    fecha_nac: "",
    rol: "cliente",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Carga inicial de usuarios
  useEffect(() => {
    async function cargarUsuarios() {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    }
    cargarUsuarios();
  }, []);

  // Validación
  const validarUsuario = (usuario: Usuario | Omit<Usuario, "id">) => {
    const nuevoErrores: Record<string, string> = {};
    let valido = true;

    if (!usuario.nombre) { nuevoErrores.nombre = "Nombre obligatorio"; valido = false; }
    if (!usuario.apellido) { nuevoErrores.apellido = "Apellido obligatorio"; valido = false; }
    if (!usuario.correo) { nuevoErrores.correo = "Correo obligatorio"; valido = false; }
    else if (!/\S+@\S+\.\S+/.test(usuario.correo)) { nuevoErrores.correo = "Formato de correo inválido"; valido = false; }
    if (!usuario.contrasenia) { nuevoErrores.contrasenia = "Contraseña obligatoria"; valido = false; }
    if (!usuario.direccion) { nuevoErrores.direccion = "Dirección obligatoria"; valido = false; }
    if (!usuario.fecha_nac) { nuevoErrores.fecha_nac = "Fecha de nacimiento obligatoria"; valido = false; }
    if (!usuario.rol) { nuevoErrores.rol = "Debe seleccionar un rol"; valido = false; }

    setErrores(nuevoErrores);
    return valido;
  };

  // CRUD
  const handleAgregar = async () => {
    if (!validarUsuario(nuevoUsuario)) return;
    try {
      const usuario = await registrarUsuario(nuevoUsuario);
      setUsuarios(prev => [...prev, usuario]);
      resetNuevoUsuario();
      setShowModal(false);
    } catch (error) {
      setErrores({ correo: (error as Error).message });
    }
  };

  const handleGuardar = async () => {
    if (!editUsuario || !validarUsuario(editUsuario)) return;
    try {
      const actualizado = await actualizarUsuario(editUsuario);
      setUsuarios(prev => prev.map(u => u.id === actualizado.id ? actualizado : u));
      setEditUsuario(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Reseteo y modales
  const resetNuevoUsuario = () => {
    setNuevoUsuario({
      nombre: "",
      apellido: "",
      correo: "",
      contrasenia: "",
      telefono: "",
      direccion: "",
      fecha_nac: "",
      rol: "cliente",
    });
    setErrores({});
  };

  const openModalNuevo = () => {
    resetNuevoUsuario();
    setEditUsuario(null);
    setShowModal(true);
  };

  const openModalEditar = (usuario: Usuario) => {
    setEditUsuario(usuario);
    setErrores({});
    setShowModal(true);
  };

  return {
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
  };
}
