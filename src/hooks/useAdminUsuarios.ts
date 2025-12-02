import { useState, useEffect } from "react";
import type { UsuarioBackend, UsuarioEditable } from "../interfaces/UsuarioBackend";

const API_URL = "http://localhost:8082/usuario";

export function useAdminUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioBackend[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editUsuario, setEditUsuario] = useState<UsuarioEditable | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState<UsuarioEditable>({
    nomUsuario: "",
    apeUsuario: "",
    correoUsuario: "",
    passUsuario: "",
    fechaNacUsuario: "1995-01-01",
    estadoUsuario: 1,
    imgUsuario: "https://drive.google.com/uc?export=view&id=TU_ID",
    roles: [{ idRol: 2, nomRol: "cliente" }],
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  
  const normalizarFecha = (fecha: string) => fecha.slice(0, 10);

  
  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const resp = await fetch(API_URL);
        const data: UsuarioBackend[] = await resp.json();

        const normalizados = data.map(u => ({
          ...u,
          fechaNacUsuario: normalizarFecha(u.fechaNacUsuario),
        }));

        setUsuarios(normalizados);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    }
    cargarUsuarios();
  }, []);

  
  const validarUsuario = (u: UsuarioEditable) => {
    const e: Record<string, string> = {};
    let ok = true;

    if (!u.nomUsuario) { e.nomUsuario = "Nombre obligatorio"; ok = false; }
    if (!u.apeUsuario) { e.apeUsuario = "Apellido obligatorio"; ok = false; }
    if (!u.correoUsuario) { e.correoUsuario = "Correo obligatorio"; ok = false; }
    if (!u.passUsuario) { e.passUsuario = "Contraseña obligatoria"; ok = false; }
    if (!u.roles?.length) { e.roles = "Debe seleccionar un rol"; ok = false; }

    setErrores(e);
    return ok;
  };

  // Crear
  const handleAgregar = async () => {
    if (!validarUsuario(nuevoUsuario)) return;

    const payload = { ...nuevoUsuario };
    delete payload.idUsuario;

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const nuevo: UsuarioBackend = await resp.json();
      nuevo.fechaNacUsuario = normalizarFecha(nuevo.fechaNacUsuario);

      setUsuarios(prev => [...prev, nuevo]);
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Editar
  const handleGuardar = async () => {
    if (!editUsuario || !validarUsuario(editUsuario)) return;

    const payload = { ...editUsuario };
    try {
      const resp = await fetch(`${API_URL}/${editUsuario.idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const actualizado: UsuarioBackend = await resp.json();
      actualizado.fechaNacUsuario = normalizarFecha(actualizado.fechaNacUsuario);

      setUsuarios(prev =>
        prev.map(u => u.idUsuario === actualizado.idUsuario ? actualizado : u)
      );

      setShowModal(false);
      setEditUsuario(null);
    } catch (e) {
      console.error(e);
    }
  };

  // "Eliminar"  solo actualizar estadoUsuario = 2
  const handleEliminar = async (idUsuario: number) => {
    const usuario = usuarios.find(u => u.idUsuario === idUsuario);
    if (!usuario) return;

    const payload = { ...usuario, estadoUsuario: 2 };
    try {
      const resp = await fetch(`${API_URL}/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const actualizado: UsuarioBackend = await resp.json();
      actualizado.fechaNacUsuario = normalizarFecha(actualizado.fechaNacUsuario);

      // Reemplaza el usuario actualizado, sin filtrar
      setUsuarios(prev =>
        prev.map(u => u.idUsuario === actualizado.idUsuario ? actualizado : u)
      );
    } catch (e) {
      console.error(e);
    }
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
    openModalNuevo: () => {
      setShowModal(true);
      setEditUsuario(null);
    },
    openModalEditar: (u: UsuarioBackend) => {
      setEditUsuario({
        ...u,
        fechaNacUsuario: normalizarFecha(u.fechaNacUsuario),
      });
      setShowModal(true);
    },
  };
}
