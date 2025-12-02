import { useState, useEffect } from "react";
import type { Venta } from "../interfaces/Venta";
import type { EstadoVenta } from "../interfaces/EstadoVenta";
import { listarVentas, actualizarVenta } from "../services/ventasService";

export function useAdminVentas() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [estados, setEstados] = useState<EstadoVenta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [ventasRes, estadosRes] = await Promise.all([
          listarVentas(),
          fetch("http://localhost:8083/estados-venta").then(r => r.json()),
        ]);
        setVentas(ventasRes);
        setEstados(estadosRes);
      } catch (err) {
        console.error(err);
      }
    };
    cargarDatos();
  }, []);

  const handleVerDetalle = (v: Venta) => {
    setVentaSeleccionada(v);
    setShowModal(true);
  };

  // ✅ idEstadoVenta es obligatorio y usamos la ventaSeleccionada existente
  const handleGuardar = async (idEstadoVenta: number) => {
    if (!ventaSeleccionada) return;

    try {
      const ventaActualizada: Venta = { ...ventaSeleccionada, idEstadoVenta };
      const resp = await actualizarVenta(ventaSeleccionada.id!, ventaActualizada);
      setVentas(prev => prev.map(v => v.id === resp.id ? resp : v));
      setShowModal(false);
      setVentaSeleccionada(null);
    } catch (err) {
      console.error("Error actualizando venta:", err);
    }
  };

  return {
    ventas,
    estados,
    showModal,
    ventaSeleccionada,
    setShowModal,
    handleVerDetalle,
    handleGuardar,
  };
}
