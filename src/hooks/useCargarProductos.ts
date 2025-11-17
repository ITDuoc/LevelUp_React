import { useState, useEffect } from "react";
import type { Producto, Marca, Categoria } from "../services/interfaces";
import { leerProductos } from "../services/productosService";
import { leerMarcas } from "../services/marcasService";
import { leerCategorias } from "../services/categoriasService";

export function useCargarProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const [prod, mar, cat] = await Promise.all([
        leerProductos(),
        leerMarcas(),
        leerCategorias(),
      ]);
      setProductos(prod);
      setMarcas(mar);
      setCategorias(cat);
    };
    cargarDatos();
  }, []);

  return { productos, marcas, categorias };
}
