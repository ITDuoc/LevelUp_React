import type { UsuarioBackend } from "../interfaces/UsuarioBackend";

const API = "http://localhost:8082";

// Registrar usuario
export async function registrarUsuario(usuario: UsuarioBackend) {
  const resp = await fetch(`${API}/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });

  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

// Actualizar usuario
export async function actualizarUsuario(id: number, usuario: Partial<UsuarioBackend>) {
  const resp = await fetch(`${API}/usuario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

// Obtener usuarios
export async function obtenerUsuarios(): Promise<UsuarioBackend[]> {
  const resp = await fetch(`${API}/usuario`);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

// Obtener por id
export async function obtenerUsuario(id: number): Promise<UsuarioBackend> {
  const resp = await fetch(`${API}/usuario/${id}`);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

// Eliminar
export async function eliminarUsuario(id: number) {
  const resp = await fetch(`${API}/usuario/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error(await resp.text());
  return true;
}

// Login con validación de estadoUsuario
export async function apiLogin(correoUsuario: string, passUsuario: string): Promise<UsuarioBackend | "ELIMINADO" | null> {
  const usuarios = await obtenerUsuarios();

  // Usuario activo
  const usuarioActivo = usuarios.find(
    (u) =>
      u.correoUsuario === correoUsuario &&
      u.passUsuario === passUsuario &&
      u.estadoUsuario === 1
  );

  if (usuarioActivo) return usuarioActivo;

  // Usuario existe pero inactivo
  const usuarioInactivo = usuarios.find(
    (u) =>
      u.correoUsuario === correoUsuario &&
      u.passUsuario === passUsuario &&
      u.estadoUsuario !== 1
  );

  if (usuarioInactivo) return "ELIMINADO";

  // No existe
  return null;
}
