import BlogLista from "../components/blog/BlogLista";
import BlogDetalle from "../components/blog/BlogDetalle";
import { useBlog } from "../hooks/useBlog";

export default function BlogPage() {
  const {
    noticias,
    vistaNoticia,
    comentarios,
    nuevoComentario,
    setNuevoComentario,
    agregarComentario,
    abrirNoticia,
    volver,
    user
  } = useBlog();

  if (!vistaNoticia) {
    return <BlogLista noticias={noticias} onAbrir={abrirNoticia} />;
  }

  return (
    <BlogDetalle
      noticia={vistaNoticia}
      comentarios={comentarios}
      nuevoComentario={nuevoComentario}
      setNuevoComentario={setNuevoComentario}
      agregarComentario={agregarComentario}
      volver={volver}
      user={user}
    />
  );
}
