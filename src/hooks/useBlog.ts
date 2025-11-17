import { useState } from "react";
import { noticias, type Noticia, type Comentario } from "../services/NoticiasBlog";
import { clientes } from "../services/DatosSimulados";
import { useUser } from "../context/UserContext";
import { ROLES } from "../context/UserRoles";

export function useBlog() {
  const { user } = useUser();

  const [vistaNoticia, setVistaNoticia] = useState<Noticia | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const abrirNoticia = (noticia: Noticia) => {
    setVistaNoticia(noticia);
    setComentarios(noticia.comentarios);
  };

  const volver = () => setVistaNoticia(null);

  const agregarComentario = () => {
    // Solo clientes pueden comentar
    if (!user || user.rol !== ROLES.CLIENTE) return;

    // Buscar cliente en datos simulados
    const cliente = clientes.find(c => c.correo_cliente === user.correo);
    if (!cliente) return;

    const nuevo: Comentario = {
      id: Date.now(),
      id_cliente: cliente.id_cliente,
      texto: nuevoComentario,
      fecha: new Date().toLocaleDateString(),
    };

    setComentarios(prev => [...prev, nuevo]);
    setNuevoComentario("");
  };

  return {
    noticias,
    vistaNoticia,
    comentarios,
    nuevoComentario,
    setNuevoComentario,
    abrirNoticia,
    agregarComentario,
    volver,
    user
  };
}
