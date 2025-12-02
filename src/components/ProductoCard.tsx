import React from "react";
import type { Producto } from "../interfaces/Producto";

interface Props {
  producto: Producto;
  marca?: string;
  categoria?: string;
  onSelect: (p: Producto) => void;
}

export default function ProductoCard({ producto, marca, categoria, onSelect }: Props) {
  return (
    <div className="col-6 col-lg-4 mb-4">
      <div
        className="card h-100 text-center"
        style={{ cursor: "pointer" }}
        onClick={() => onSelect(producto)}
      >
        <img
          src={producto.imgProducto}
          className="card-img-top"
          alt={producto.nomProducto}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nomProducto}</h5>
          <p className="mb-1">{marca ?? producto.marca?.nomMarca}</p>
          <p className="small mb-2">{categoria ?? producto.categoria?.nomCategoria}</p>
          <p className="card-text fw-bold">${producto.precioProducto.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
