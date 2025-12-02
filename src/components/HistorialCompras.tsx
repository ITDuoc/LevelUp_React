import React from "react";
import { Venta } from "../interfaces/Venta";
import { useProductos } from "../hooks/useProductos";

export default function HistorialCompras({ ventas }: { ventas: Venta[] }) {
  const { productos } = useProductos();

  if (!ventas || ventas.length === 0) {
    return <p className="text-center mt-4">No tienes compras registradas.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="mb-3">Historial de Compras</h3>

      {ventas.map((venta) => (
        <div key={venta.id} className="cardSimple mb-3 p-3">
          <h5 className="text-violeta">Compra realizada</h5>

          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(venta.fechaVenta).toLocaleString()}
          </p>

          <p>
            <strong>Total:</strong> ${venta.totalVenta.toLocaleString()}
          </p>

          <p>
            <strong>Envío:</strong> {venta.dirEnvio}
          </p>

          <div className="mt-3">
            <strong>Productos:</strong>

            <ul className="list-group mt-2">
              {venta.detalles?.map((d) => {
                const prod = productos.find(
                  (p) => p.idProducto === d.idProducto
                );

                return (
                  <li
                    key={d.id}
                    className="list-group-item cardSimple d-flex justify-content-between"
                  >
                    <span>
                      {prod ? prod.nomProducto : `Producto #${d.idProducto}`} x{" "}
                      {d.cantidad}
                    </span>

                    <span>${d.subtotal.toLocaleString()}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
