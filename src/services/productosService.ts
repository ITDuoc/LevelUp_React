import { productos, marcas, categorias } from "./DatosSimulados";
import type { Producto, Marca, Categoria } from "./interfaces";

export const leerProductos = async (): Promise<Producto[]> => {
  return productos;
};

export const leerMarcas = async (): Promise<Marca[]> => {
  return marcas.filter(m => m.estado_marca);
};

export const leerCategorias = async (): Promise<Categoria[]> => {
  return categorias.filter(c => c.estado_categoria);
};
