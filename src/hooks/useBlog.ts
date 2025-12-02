import { useState, useEffect } from "react";
import type { Noticia } from "../interfaces/Noticia";
import type { Comentario } from "../interfaces/Comentario";
import type { UsuarioBackend } from "../interfaces/UsuarioBackend";
import { listarNoticias } from "../services/NoticiasBlog";
import { crearComentario } from "../services/comentariosService";
import { obtenerUsuarios } from "../services/usuariosService";

export function useBlog() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true);
        const [dataNoticias, dataUsuarios] = await Promise.all([
          listarNoticias(),
          obtenerUsuarios(),
        ]);
        setNoticias(dataNoticias);
        setUsuarios(dataUsuarios);
      } catch (err) {
        console.error(err);
        setError("Error al cargar noticias o usuarios");
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  // Obtener comentarios de una noticia
  const comentariosPorNoticia = (idNoticia: number): Comentario[] => {
    const noticia = noticias.find((n) => n.id === idNoticia);
    return noticia?.comentarios || [];
  };

  // Agregar un comentario a una noticia usando correo del usuario logeado
  const agregarComentarioHandler = async (
    noticiaId: number,
    nuevoComentario: Omit<Comentario, "id" | "idUsuario"> & { correoUsuario?: string }
  ) => {
    try {
      // Mapear idUsuario a partir del correo
      if (!nuevoComentario.correoUsuario) throw new Error("Correo del usuario requerido");
      const userBackend = usuarios.find(u => u.correoUsuario === nuevoComentario.correoUsuario);
      if (!userBackend) throw new Error("Usuario no encontrado");

      const comentarioConUsuario: Omit<Comentario, "id"> = {
        ...nuevoComentario,
        idUsuario: userBackend.idUsuario,
      };

      const comentarioCreado = await crearComentario(comentarioConUsuario);

      setNoticias((prev) =>
        prev.map((n) =>
          n.id === noticiaId
            ? { ...n, comentarios: [...(n.comentarios || []), comentarioCreado] }
            : n
        )
      );
    } catch (err) {
      console.error("Error al crear comentario", err);
    }
  };

  // Obtener nombre real de usuario a partir de su id
  const obtenerNombreUsuario = (idUsuario: number): string => {
    const user = usuarios.find((u) => u.idUsuario === idUsuario);
    return user ? `${user.nomUsuario} ${user.apeUsuario}` : `Usuario ${idUsuario}`;
  };

  // Obtener usuario completo
  const obtenerUsuarioPorId = (idUsuario: number): UsuarioBackend | undefined => {
    return usuarios.find(u => u.idUsuario === idUsuario);
  };

  return {
    noticias,
    comentariosPorNoticia,
    agregarComentarioHandler,
    obtenerNombreUsuario,
    obtenerUsuarioPorId,
    loading,
    error,
  };
}
