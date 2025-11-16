import { useState, useEffect } from "react";
import type { Usuario } from "../services/usuariosService";
import {
  obtenerUsuarios,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../services/usuariosService";
import { clientes, vendedores, administradores } from "../services/DatosSimulados";

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

  // Funcion para mapear datos simulados a Usuario
  const mapearUsuariosSimulados = (): Usuario[] => {
    const clientesMapeados: Usuario[] = clientes.map(c => ({
      id: c.id_cliente,
      nombre: c.nombre_cliente,
      apellido: c.apellido_cliente,
      correo: c.correo_cliente,
      contrasenia: c.contrasenia_cliente,
      telefono: c.telefono, 
      direccion: c.direccion,
      fecha_nac: c.fecha_nac_cliente,
      rol: "cliente",
    }));

    const vendedoresMapeados: Usuario[] = vendedores.map(v => ({
      id: v.id_vendedor,
      nombre: v.nombre_vendedor,
      apellido: v.apellido_vendedor,
      correo: v.correo_vendedor,
      contrasenia: v.contrasenia_vendedor,
      telefono: "", 
      direccion: "",
      fecha_nac: v.fecha_nac_vendedor,
      rol: "vendedor",
    }));

    const adminsMapeados: Usuario[] = administradores.map(a => ({
      id: a.id_administrador,
      nombre: a.nombre_administrador,
      apellido: a.apellido_administrador,
      correo: a.correo_administrador,
      contrasenia: a.contrasenia_administrador,
      telefono: "", 
      direccion: "",
      fecha_nac: a.fecha_nac_administrador,
      rol: "administrador",
    }));

    return [...clientesMapeados, ...vendedoresMapeados, ...adminsMapeados];
  };

  // Carga inicial de usuarios
  useEffect(() => {
    async function cargarUsuarios() {
      const data = await obtenerUsuarios();
      if (data.length === 0) {
        const simulados = mapearUsuariosSimulados();
        simulados.forEach(u => registrarUsuario(u)); 
        setUsuarios(simulados);
      } else {
        setUsuarios(data);
      }
    }

    cargarUsuarios();
  }, []);

  // Validacion de campos
  const validarUsuario = (usuario: Usuario | Omit<Usuario, "id">) => {
    const nuevoErrores: Record<string, string> = {};
    let valido = true;

    if (!usuario.nombre) { nuevoErrores.nombre = "Nombre obligatorio"; valido = false; }
    if (!usuario.apellido) { nuevoErrores.apellido = "Apellido obligatorio"; valido = false; }
    if (!usuario.correo) {
      nuevoErrores.correo = "Correo obligatorio"; valido = false;
    } else if (!/\S+@\S+\.\S+/.test(usuario.correo)) {
      nuevoErrores.correo = "Formato de correo inválido"; valido = false;
    }
    if (!usuario.contrasenia) { nuevoErrores.contrasenia = "Contraseña obligatoria"; valido = false; }
    if (!usuario.direccion) { nuevoErrores.direccion = "Dirección obligatoria"; valido = false; }
    if (!usuario.fecha_nac) { nuevoErrores.fecha_nac = "Fecha de nacimiento obligatoria"; valido = false; }
    if (!usuario.rol) { nuevoErrores.rol = "Debe seleccionar un rol"; valido = false; }

    setErrores(nuevoErrores);
    return valido;
  };

  // Funciones CRUD
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
    const actualizado = await actualizarUsuario(editUsuario);
    setUsuarios(prev => prev.map(u => u.id === actualizado.id ? actualizado : u));
    setEditUsuario(null);
    setShowModal(false);
  };

  const handleEliminar = async (id: number) => {
    await eliminarUsuario(id);
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

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
