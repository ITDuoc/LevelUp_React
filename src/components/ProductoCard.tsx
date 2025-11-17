import React from "react";
import type { Producto } from "../services/interfaces";

interface Props {
  producto: Producto;
  marca?: string;
  categoria?: string;
  onSelect: (p: Producto) => void;
}

export default function ProductoCard({ producto, marca, categoria, onSelect }: Props) {
  return (
    <div className="col-6 col-lg-4 mb-4">
      <div className="card h-100 text-center" style={{ cursor: "pointer" }} onClick={() => onSelect(producto)}>
        <img src={producto.imagen_producto} className="card-img-top" alt={producto.nombre_producto} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre_producto}</h5>
          <p className="mb-1">{marca}</p>
          <p className="small mb-2">{categoria}</p>
          <p className="card-text fw-bold">${producto.precio.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
