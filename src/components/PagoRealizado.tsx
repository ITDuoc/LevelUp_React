import React from "react";
import { usePagoRealizado } from "../hooks/usePagoRealizado";
import { useNavigate } from "react-router-dom";

export default function PagoRealizado() {
  const { pedido } = usePagoRealizado();
  const navigate = useNavigate();

  if (!pedido) return <p className="text-center mt-5">Procesando pago...</p>;

  return (
    <div className="container mt-5 text-center">
      <div className="cardSimple shadow p-5 mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="mb-3 text-success">
          <i className="bi bi-check-circle-fill"></i> ¡Pago realizado con éxito!
        </h1>
        <p className="fs-5 mb-3">Gracias por tu compra. Tu pedido está siendo procesado.</p>

        <div className="mb-3">
          <p className="small text-muted">Número de pedido: {pedido.id}</p>
          <p className="small text-muted">Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
        </div>

        <div className="list-group mb-3">
          {pedido.items.map(item => (
            <div key={item.producto.id_producto} className="list-group-item d-flex justify-content-between">
              <span>{item.producto.nombre_producto} x {item.cantidad}</span>
              <span>${item.total.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <h4>Total: ${pedido.total.toLocaleString()}</h4>

        <button
          className="btn btn-primary mt-4 px-4"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
