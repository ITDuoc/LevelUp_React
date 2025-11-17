import type { Venta, DetalleVenta } from "./interfaces";
import { ventas as ventasSimulados, detalleVentas as detalleVentasSimulados, productos as productosSimulados } from "./DatosSimulados";

// Obtener ventas de un cliente
export const obtenerVentasPorCliente = async (idCliente: number): Promise<Venta[]> => {
  return ventasSimulados.filter(v => v.id_cliente === idCliente);
};

// Obtener detalles de venta
export const obtenerDetallesDeVenta = async (idVenta: number): Promise<(DetalleVenta & { nombre_producto?: string })[]> => {
  return detalleVentasSimulados
    .filter(d => d.id_venta === idVenta)
    .map(d => ({
      ...d,
      nombre_producto: productosSimulados.find(p => p.id_producto === d.id_producto)?.nombre_producto,
    }));
};
