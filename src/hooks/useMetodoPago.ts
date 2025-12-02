import { useState, useEffect } from "react";
import { MetodoPago } from "../interfaces/MetodoPago";
import { metodoPagoService } from "../services/metodoPagoService";

export function useMetodoPago() {
  const [metodos, setMetodos] = useState<MetodoPago[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    metodoPagoService.listar().then(res => {
      setMetodos(res);
      setLoading(false);
    });
  }, []);

  const crear = async (mp: MetodoPago) => {
    const nuevo = await metodoPagoService.crear(mp);
    setMetodos(prev => [...prev, nuevo]);
    return nuevo;
  };

  const eliminar = async (id: number) => {
    await metodoPagoService.eliminar(id);
    setMetodos(prev => prev.filter(m => m.id !== id));
  };

  return { metodos, loading, crear, eliminar };
}
