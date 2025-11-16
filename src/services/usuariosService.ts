// usuariosService.ts
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono?: string;
  direccion: string;
  fecha_nac: string;
  rol: "cliente" | "vendedor" | "administrador" | "";
}

const STORAGE_KEY = "usuarios";

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
