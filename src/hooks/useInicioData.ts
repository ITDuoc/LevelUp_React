import { useEffect, useState } from "react";
import type { Producto, Categoria } from "../interfaces/Producto";
import { listarProductos, listarCategorias } from "../services/productosService";
import { leerEvento } from "../services/eventosService";

export function useInicioData() {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [categoriasData, setCategoriasData] = useState<Categoria[]>([]);
  const [evento, setEvento] = useState<any>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [prod, cats, ev] = await Promise.all([
          listarProductos(),
          listarCategorias(),
          leerEvento()
        ]);

        // Normalizar categoria y marca
        const normalizados = prod.map(p => ({
          ...p,
          categoria: p.categoria ?? null,
          marca: p.marca ?? null,
        }));

        setProductosDestacados(normalizados);
        setCategoriasData(cats);
        setEvento(ev);
      } catch (err) {
        console.error("Error al cargar datos de inicio:", err);
      }
    };
    cargarDatos();
  }, []);

  return {
    productosDestacados,
    categoriasData,
    evento
  };
}
