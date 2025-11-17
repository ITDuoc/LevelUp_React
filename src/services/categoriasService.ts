import { categorias } from "../services/DatosSimulados";
import type { Categoria } from "../services/interfaces"; 

export const leerCategorias = async (): Promise<Categoria[]> => {
  // Simula una llamada a API
  return categorias;
};
