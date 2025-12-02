import React from "react";
import { useNavigate } from "react-router-dom";
import type { Noticia } from "../../interfaces/Noticia";

interface Props {
  noticias: Noticia[];
}

export default function BlogLista({ noticias }: Props) {
  const navigate = useNavigate();

  if (!noticias || noticias.length === 0) {
    return <p className="container mt-4">No hay noticias disponibles.</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Gamer</h1>

      {noticias.map((n) => (
        <div key={n.id} className="cardSimple mb-3 p-3 d-flex flex-row">
          <img
            src={n.imgNoticia}
            alt={n.nomNoticia}
            style={{ width: "200px", height: "120px", objectFit: "cover", marginRight: "1rem" }}
          />
          <div>
            <h5>{n.nomNoticia}</h5>
            <p className="text-muted">{new Date(n.fechaNoticia).toLocaleDateString()}</p>
            <p>{n.detNoticia.length > 120 ? n.detNoticia.slice(0, 120) + "..." : n.detNoticia}</p>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate(`/blog/${n.id}`)}
            >
              Leer más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
