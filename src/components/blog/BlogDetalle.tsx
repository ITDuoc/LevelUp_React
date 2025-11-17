import React from "react";
import type { Noticia, Comentario } from "../../services/NoticiasBlog";
import { clientes } from "../../services/DatosSimulados";

interface Props {
  noticia: Noticia;
  comentarios: Comentario[];
  nuevoComentario: string;
  setNuevoComentario: (v: string) => void;
  agregarComentario: () => void;
  volver: () => void;
  user: any;
}

export default function BlogDetalle({
  noticia,
  comentarios,
  nuevoComentario,
  setNuevoComentario,
  agregarComentario,
  volver,
  user
}: Props) {
  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={volver}>
        ← Volver al blog
      </button>

      <div className="cardSimple p-3">
        <h2>{noticia.titulo}</h2>
        <p className="text-muted">{noticia.fecha}</p>

        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            marginBottom: "1rem",
          }}
        />

        <p>{noticia.contenido}</p>

        <h5>Comentarios</h5>

        {comentarios.map((c) => {
          const cliente = clientes.find(cl => cl.id_cliente === c.id_cliente);

          return (
            <div key={c.id} className="cardSimple p-2 mb-2 d-flex align-items-start">
              {cliente && (
                <img
                  src={cliente.imagen_cliente || "https://via.placeholder.com/40"}
                  alt={cliente.nombre_cliente}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "0.5rem",
                  }}
                />
              )}

              <div>
                <p style={{ margin: 0 }}>
                  <strong>
                    {cliente?.nombre_cliente} {cliente?.apellido_cliente}
                  </strong>{" "}
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {c.fecha}
                  </span>
                </p>

                <p style={{ margin: 0 }}>{c.texto}</p>
              </div>
            </div>
          );
        })}

        {user?.rol === "cliente" && (
          <div className="mt-3">
            <textarea
              className="form-control mb-2"
              rows={3}
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
            />
            <button className="btn btn-primary" onClick={agregarComentario}>
              Agregar comentario
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
