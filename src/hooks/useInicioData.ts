import { useEffect, useState } from "react";
import { leerProductos } from "../services/productosService";
import { leerCategorias } from "../services/categoriasService";
import { leerEvento } from "../services/eventosService";
import type { Producto, Categoria } from "../services/interfaces";

export function useInicioData() {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [categoriasData, setCategoriasData] = useState<Categoria[]>([]);
  const [evento, setEvento] = useState<any>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setProductosDestacados(await leerProductos());
      setCategoriasData(await leerCategorias());
      setEvento(await leerEvento());
    };
    cargarDatos();
  }, []);

  return {
    productosDestacados,
    categoriasData,
    evento
  };
}
