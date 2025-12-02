import { useState, useEffect } from "react";
import type { Producto, Marca, Categoria } from "../interfaces/Producto";
import { listarProductos, listarMarcas, listarCategorias } from "../services/productosService";

export function useCargarProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [prod, mar, cat] = await Promise.all([
          listarProductos(),
          listarMarcas(),
          listarCategorias(),
        ]);

        // Normalizar categoria y marca de cada producto
        const productosNormalizados = prod.map(p => ({
          ...p,
          categoria: p.categoria ?? null,
          marca: p.marca ?? null,
        }));

        setProductos(productosNormalizados);
        setMarcas(mar);
        setCategorias(cat);
      } catch (err) {
        console.error("Error al cargar productos, marcas o categorías:", err);
      }
    };

    cargarDatos();
  }, []);

  return { productos, marcas, categorias };
}
