import { useEffect, useState } from "react";
import { Venta } from "../interfaces/Venta";
import { useUser } from "../context/UserContext";

export function useCuenta() {
  const { user } = useUser();
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; 

    const fetchVentas = async () => {
      setLoading(true); 

      try {
        const res = await fetch("http://localhost:8083/ventas");
        if (!res.ok) throw new Error("Error al obtener ventas");

        const data: Venta[] = await res.json();

        // Filtrar ventas del usuario logueado
        const filtradas = data.filter(v => v.idUsuario === user.idUsuario);

        setVentas(filtradas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, [user]);

  return { ventas, loading };
}
