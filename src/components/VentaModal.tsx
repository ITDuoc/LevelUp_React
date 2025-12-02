import React from "react";
import type { Venta } from "../interfaces/Venta";
import type { EstadoVenta } from "../interfaces/EstadoVenta";

interface Props {
  show: boolean;
  onClose: () => void;
  venta: Venta | null;
  estados: EstadoVenta[];
}

export default function VentaModal({ show, onClose, venta, estados }: Props) {
  if (!show || !venta) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card cardSimple">
        <h4>Detalle Venta #{venta.id}</h4>
        <p><strong>Fecha:</strong> {new Date(venta.fechaVenta).toLocaleString()}</p>
        <p><strong>Dirección de envío:</strong> {venta.dirEnvio}</p>
        <p><strong>Total:</strong> ${venta.totalVenta}</p>

        <table className="table table-sm mb-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {(venta.detalles ?? []).map(d => (
              <tr key={d.id}>
                <td>{d.idProducto}</td>
                <td>{d.cantidad}</td>
                <td>${d.precioUnitario}</td>
                <td>${d.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón Cerrar con el mismo estilo que el antiguo botón Guardar */}
        <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
