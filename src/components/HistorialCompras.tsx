import React, { useEffect, useState } from "react";
import type { Venta, DetalleVenta } from "../services/interfaces";
import * as ventasService from "../services/ventasService";

interface Props {
  ventas: Venta[];
}

export default function HistorialCompras({ ventas }: Props) {
  const [detalles, setDetalles] = useState<Record<number, (DetalleVenta & { nombre_producto?: string })[]>>({});

  useEffect(() => {
    ventas.forEach(async (v) => {
      const d = await ventasService.obtenerDetallesDeVenta(v.id_venta);
      setDetalles(prev => ({ ...prev, [v.id_venta]: d }));
    });
  }, [ventas]);

  if (ventas.length === 0) return <div className="cardSimple p-3"><p>No tienes compras registradas aún.</p></div>;

  return (
    <>
      {ventas.map(v => (
        <div key={v.id_venta} className="cardSimple p-3 mb-3">
          <p><strong>Fecha:</strong> {v.fecha_venta}</p>
          <p><strong>Total:</strong> ${v.total_venta}</p>
          <ul>
            {detalles[v.id_venta]?.map(d => (
              <li key={d.id_detalle}>{d.nombre_producto} x{d.cantidad} - ${d.total}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
