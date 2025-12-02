import React from "react";
import { useNavigate } from "react-router-dom";

export default function PagoRealizado() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="cardSimple shadow p-5 mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="mb-3 text-success">
          <i className="bi bi-check-circle-fill"></i> ¡Pago realizado con éxito!
        </h1>
        <p className="fs-5 mb-3">Gracias por tu compra. Tu pedido está siendo procesado.</p>

        <h4 className="mb-4">¡Disfruta tu compra!</h4>

        <button
          className="btn btn-primary px-4"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
