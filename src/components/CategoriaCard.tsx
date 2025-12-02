import React from "react";
import type { Categoria } from "../interfaces/Producto";

interface CategoriaCardProps {
  categoria: Categoria;
  onClick?: () => void;
}

export function CategoriaCard({ categoria, onClick }: CategoriaCardProps) {
  return (
    <div className="col-6 col-md-4 mb-3">
      <div
        className="card h-100 text-center cursor-pointer"
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <img
          src={categoria.imgCategoria}
          className="card-img-top"
          alt={categoria.nomCategoria}
        />
        <div className="card-body">
          <h5 className="card-title">{categoria.nomCategoria}</h5>
          <p className="card-text">{categoria.descCategoria}</p>
        </div>
      </div>
    </div>
  );
}
