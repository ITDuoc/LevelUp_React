import React from "react";
import type { Noticia } from "../../services/NoticiasBlog";

interface Props {
  noticias: Noticia[];
  onAbrir: (n: Noticia) => void;
}

export default function BlogLista({ noticias, onAbrir }: Props) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Blog Gamer</h1>

      {noticias.map((n) => (
        <div
          key={n.id}
          className="cardSimple mb-3 p-3 d-flex flex-row"
        >
          <img
            src={n.imagen}
            alt={n.titulo}
            style={{
              width: "200px",
              height: "120px",
              objectFit: "cover",
              marginRight: "1rem",
            }}
          />
          <div>
            <h5>{n.titulo}</h5>
            <p className="text-muted">{n.fecha}</p>
            <p>{n.contenido.slice(0, 120)}...</p>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onAbrir(n)}
            >
              Leer más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
