import { useState, useEffect } from "react";
import { EstadoVenta } from "../interfaces/EstadoVenta";
import { estadoVentaService } from "../services/estadoVentaService";

export function useEstadoVenta() {
  const [estados, setEstados] = useState<EstadoVenta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    estadoVentaService.listar().then(res => {
      setEstados(res);
      setLoading(false);
    });
  }, []);

  const crear = async (ev: EstadoVenta) => {
    const nuevo = await estadoVentaService.crear(ev);
    setEstados(prev => [...prev, nuevo]);
    return nuevo;
  };

  const eliminar = async (id: number) => {
    await estadoVentaService.eliminar(id);
    setEstados(prev => prev.filter(e => e.id !== id));
  };

  return { estados, loading, crear, eliminar };
}
