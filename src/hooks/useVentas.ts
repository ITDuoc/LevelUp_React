import { useState, useEffect } from "react";
import { Venta } from "../interfaces/Venta";
import * as ventasService from "../services/ventasService";

export function useVentas() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ventasService.listarVentas().then(v => {
      setVentas(v);
      setLoading(false);
    });
  }, []);

  const crear = async (venta: Venta) => {
    const nueva = await ventasService.crearVenta(venta);
    setVentas(prev => [...prev, nueva]);
    return nueva;
  };

  const eliminar = async (id: number) => {
    await ventasService.eliminarVenta(id);
    setVentas(prev => prev.filter(v => v.id !== id));
  };

  return { ventas, loading, crear, eliminar };
}
