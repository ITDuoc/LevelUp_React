import type { Comentario } from "../interfaces/Comentario";

const BASE_URL = "http://localhost:8085"; 

export async function crearComentario(comentario: Omit<Comentario, "id">): Promise<Comentario> {
  const response = await fetch(`${BASE_URL}/comentarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comentario),
  });

  if (!response.ok) {
    throw new Error("Error al crear comentario");
  }

  return response.json();
}
