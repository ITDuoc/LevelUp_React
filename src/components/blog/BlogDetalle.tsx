import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../../hooks/useBlog";
import { useUser } from "../../context/UserContext";

export default function BlogDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { noticias, comentariosPorNoticia, agregarComentarioHandler, obtenerNombreUsuario, obtenerUsuarioPorId, loading } = useBlog();
  const { user } = useUser();

  const [nuevoComentario, setNuevoComentario] = useState("");

  if (loading) return <p className="container mt-4">Cargando...</p>;

  const noticia = noticias.find((n) => n.id === Number(id));
  const comentarios = noticia ? comentariosPorNoticia(noticia.id) : [];

  if (!noticia) return <p className="container mt-4">Noticia no encontrada</p>;

  const handleAgregarComentario = async () => {
    if (!nuevoComentario.trim() || !user?.correo) return;

    await agregarComentarioHandler(noticia.id, {
      detComentario: nuevoComentario,
      fechaComentario: new Date().toISOString(),
      correoUsuario: user.correo, 
      noticia: { id: noticia.id },
    });
    setNuevoComentario("");
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/blog")}>
        ← Volver al blog
      </button>

      <div className="cardSimple p-3">
        <h2>{noticia.nomNoticia}</h2>
        <p className="text-muted">{new Date(noticia.fechaNoticia).toLocaleDateString()}</p>

        <img
          src={noticia.imgNoticia}
          alt={noticia.nomNoticia}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginBottom: "1rem" }}
        />

        <p>{noticia.detNoticia}</p>

        <h5>Comentarios</h5>

        {comentarios.map((c) => {
          const usuario = obtenerUsuarioPorId(c.idUsuario);
          return (
            <div key={c.id} className="cardSimple p-2 mb-2 d-flex align-items-start">
              {usuario && (
                <img
                  src={usuario.imgUsuario}
                  alt={usuario.nomUsuario}
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: "0.5rem" }}
                />
              )}
              <div>
                <p style={{ margin: 0 }}>
                  <strong>{usuario ? `${usuario.nomUsuario} ${usuario.apeUsuario}` : `Usuario ${c.idUsuario}`}</strong>{" "}
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {new Date(c.fechaComentario).toLocaleString()}
                  </span>
                </p>
                <p style={{ margin: 0 }}>{c.detComentario}</p>
              </div>
            </div>
          );
        })}

        {user && (
          <div className="mt-3">
            <textarea
              className="form-control mb-2"
              rows={3}
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
            />
            <button className="btn btn-primary" onClick={handleAgregarComentario}>
              Agregar comentario
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
