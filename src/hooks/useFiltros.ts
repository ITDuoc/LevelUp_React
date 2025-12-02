import { useState } from "react";
import type { Categoria, Marca } from "../interfaces/Producto";

export function useFiltros(categorias: Categoria[], marcas: Marca[]) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<number[]>([]);

  
  const handleCheckboxCategoria = (idCategoria: number) => {
    setCategoriasSeleccionadas(prev =>
      prev.includes(idCategoria) ? prev.filter(id => id !== idCategoria) : [...prev, idCategoria]
    );
  };

  const handleCheckboxMarca = (idMarca: number) => {
    setMarcasSeleccionadas(prev =>
      prev.includes(idMarca) ? prev.filter(id => id !== idMarca) : [...prev, idMarca]
    );
  };

  // Filtra productos segun los filtros activos
  const filtrarProductos = <T extends { categoria: Categoria | null; marca: Marca | null }>(productos: T[]) => {
    return productos.filter(p => {
      const catOk =
        categoriasSeleccionadas.length === 0 ||
        (p.categoria ? categoriasSeleccionadas.includes(p.categoria.idCategoria) : false);
      const marOk =
        marcasSeleccionadas.length === 0 ||
        (p.marca ? marcasSeleccionadas.includes(p.marca.idMarca) : false);
      return catOk && marOk;
    });
  };

  return {
    categoriasSeleccionadas,
    marcasSeleccionadas,
    setCategoriasSeleccionadas,
    setMarcasSeleccionadas,
    handleCheckboxCategoria,
    handleCheckboxMarca,
    filtrarProductos,
  };
}
