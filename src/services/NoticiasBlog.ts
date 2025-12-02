import type { Noticia } from "../interfaces/Noticia";
import type { Comentario } from "../interfaces/Comentario";

const API_URL = "http://localhost:8085";

export async function listarNoticias(): Promise<Noticia[]> {
  const resp = await fetch(`${API_URL}/noticias`);
  return resp.json();
}

export async function listarComentarios(): Promise<Comentario[]> {
  const resp = await fetch(`${API_URL}/comentarios`);
  return resp.json();
}

export async function listarComentariosPorNoticia(idNoticia: number): Promise<Comentario[]> {
  const resp = await fetch(`${API_URL}/comentarios/noticia/${idNoticia}`);
  return resp.json();
}
