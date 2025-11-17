import { marcas } from "./DatosSimulados";
import type { Marca } from "./interfaces";

export const leerMarcas = async (): Promise<Marca[]> => {
  return marcas.filter(m => m.estado_marca);
};
