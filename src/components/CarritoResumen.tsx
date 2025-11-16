import React from "react";

interface Props {
  total: number;
  onVaciarCarrito: () => void;
  onCheckout: () => void;
}

export default function CarritoResumen({ total, onVaciarCarrito, onCheckout }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 p-3 cardSimple">
      <h4 className="mb-0">Total: ${total.toLocaleString()}</h4>
      <div>
        <button className="btn btn-secondary me-2" onClick={onVaciarCarrito}>
          Vaciar Carrito
        </button>
        <button className="btn btn-primary" onClick={onCheckout}>
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}
