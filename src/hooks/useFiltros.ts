import { useState } from "react";

export function useFiltros(categorias: string[], marcas: string[]) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState<string[]>([]);

  const handleCheckbox = (
    valor: string,
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (arr.includes(valor)) setArr(arr.filter(v => v !== valor));
    else setArr([...arr, valor]);
  };

  return {
    categoriasSeleccionadas,
    setCategoriasSeleccionadas,
    marcasSeleccionadas,
    setMarcasSeleccionadas,
    handleCheckbox,
  };
}
