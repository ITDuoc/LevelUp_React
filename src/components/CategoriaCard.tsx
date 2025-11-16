import React from "react";
import type { Categoria } from "../services/interfaces";

export function CategoriaCard({ categoria }: { categoria: Categoria }) {
  return (
    <div className="col-6 col-md-4 mb-3">
      <div className="card h-100 text-center">
        <img
          src={categoria.imagen_categoria}
          className="card-img-top"
          alt={categoria.nombre_categoria}
        />
        <div className="card-body">
          <h5 className="card-title">{categoria.nombre_categoria}</h5>
          <p className="card-text">{categoria.descripcion_categoria}</p>
        </div>
      </div>
    </div>
  );
}
