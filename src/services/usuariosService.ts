import { clientes, vendedores, administradores } from "./DatosSimulados";

// Definición del tipo Usuario
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono?: string;
  direccion: string;
  fecha_nac: string;
  rol: "cliente" | "vendedor" | "administrador";
}

const STORAGE_KEY = "usuarios";

// Mapea datos simulados al tipo Usuario
const mapearUsuariosSimulados = (): Usuario[] => {
  const clientesMapeados: Usuario[] = clientes.map(c => ({
    id: c.id_cliente,
    nombre: c.nombre_cliente,
    apellido: c.apellido_cliente,
    correo: c.correo_cliente,
    contrasenia: c.contrasenia_cliente,
    telefono: c.telefono || "",
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

// Inicializa localStorage agregando los usuarios simulados que falten
const inicializarUsuarios = () => {
  const existentes: Usuario[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const simulados = mapearUsuariosSimulados();

  // Filtrar solo los usuarios simulados que aún no existen
  const usuariosFaltantes = simulados.filter(
    s => !existentes.some(e => e.correo.toLowerCase() === s.correo.toLowerCase())
  );

  if (usuariosFaltantes.length > 0) {
    const todosUsuarios = [...existentes, ...usuariosFaltantes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todosUsuarios));
  }
};

// Inicializamos al cargar el módulo
inicializarUsuarios();

// CRUD
export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const registrarUsuario = async (usuario: Omit<Usuario, "id">): Promise<Usuario> => {
  const usuariosPrevios: Usuario[] = await obtenerUsuarios();

  if (usuariosPrevios.some(u => u.correo.toLowerCase() === usuario.correo.toLowerCase())) {
    throw new Error("El correo ya está registrado");
  }

  const nuevoUsuario: Usuario = { id: Date.now(), ...usuario };
  usuariosPrevios.push(nuevoUsuario);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosPrevios));
  return nuevoUsuario;
};

export const actualizarUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const usuariosPrevios: Usuario[] = await obtenerUsuarios();
  const index = usuariosPrevios.findIndex(u => u.id === usuario.id);
  if (index === -1) throw new Error("Usuario no encontrado");

  usuariosPrevios[index] = usuario;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosPrevios));
  return usuario;
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  const usuariosPrevios: Usuario[] = await obtenerUsuarios();
  const nuevosUsuarios = usuariosPrevios.filter(u => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosUsuarios));
};
