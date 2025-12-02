import { ventas, detalleVentas, productos, clientes, categorias } from "./DatosSimulados";

export interface CategoriaVentas {
  nombre: string;
  vendidos: number;
  color: string;
}

export const obtenerDashboardData = () => {
  return { ventas, detalleVentas, productos, clientes, categorias };
};
