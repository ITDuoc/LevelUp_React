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


// Obtener roles

export async function obtenerUsuarios(): Promise<UsuarioBackend[]> {
  const resp = await fetch(`${API}/usuario`);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}


// Ontener por id

export async function obtenerUsuario(id: number): Promise<UsuarioBackend> {
  const resp = await fetch(`${API}/usuario/${id}`);
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}


// Eliminar

export async function eliminarUsuario(id: number) {
  const resp = await fetch(`${API}/usuario/${id}`, {
    method: "DELETE",
  });

  if (!resp.ok) throw new Error(await resp.text());
  return true;
}


export async function apiLogin(correoUsuario: string, passUsuario: string): Promise<UsuarioBackend | null> {
  const usuarios = await obtenerUsuarios();

  // Buscar usuario por correo y contraseña
  const usuario = usuarios.find(
    (u) => u.correoUsuario === correoUsuario && u.passUsuario === passUsuario
  );

  // Si no existe, devolvemos null
  if (!usuario) return null;

  // Devolver usuario completo (incluyendo roles) para redireccion en la web
  return usuario;
}
