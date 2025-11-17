import React from "react";
import type { CarritoItem } from "../services/carritoService";

interface Props {
  item: CarritoItem;
  onActualizarCantidad: (productoId: number, cantidad: number) => void;
  onEliminar: (productoId: number) => void;
}

export default function CarritoItem({ item, onActualizarCantidad, onEliminar }: Props) {
  return (
    <div className="list-group-item cardSimple d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center">
        <img
          src={item.producto.imagen_producto}
          alt={item.producto.nombre_producto}
          className="rounded"
          style={{ width: 80, height: 80, objectFit: "cover", marginRight: "1rem", border: "2px solid var(--color-morado)" }}
        />
        <div>
          <h5 className="mb-1 text-violeta">{item.producto.nombre_producto}</h5>
          <p className="mb-0">Precio: ${item.producto.precio.toLocaleString()}</p>
          <p className="mb-0">Subtotal: ${item.total.toLocaleString()}</p>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end me-3">
        <div className="d-flex mb-2 gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onActualizarCantidad(item.producto.id_producto, item.cantidad - 1)}
          >
            -
          </button>
          <span className="px-2">{item.cantidad}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onActualizarCantidad(item.producto.id_producto, item.cantidad + 1)}
          >
            +
          </button>
        </div>
        <button className="btn btn-danger btn-sm mt-1" onClick={() => onEliminar(item.producto.id_producto)} title="Eliminar">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}
