import { Venta, DetalleVenta } from "../interfaces/Venta";

const URL_VENTAS = "http://localhost:8083/ventas";
const URL_DETALLES = "http://localhost:8083/detalle-ventas";

// Ventas
export const listarVentas = async (): Promise<Venta[]> => {
  const resp = await fetch(URL_VENTAS);
  if (!resp.ok) throw new Error("Error al listar ventas");
  return resp.json();
};

export const crearVenta = async (venta: Venta): Promise<Venta> => {
  const resp = await fetch(URL_VENTAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta),
  });
  if (!resp.ok) throw new Error("Error al crear la venta");
  return resp.json();
};

export const obtenerVenta = async (id: number): Promise<Venta> => {
  const resp = await fetch(`${URL_VENTAS}/${id}`);
  if (!resp.ok) throw new Error("Venta no encontrada");
  return resp.json();
};

export const actualizarVenta = async (id: number, venta: Venta): Promise<Venta> => {
  const resp = await fetch(`${URL_VENTAS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta),
  });
  if (!resp.ok) throw new Error("Error al actualizar la venta");
  return resp.json();
};

export const eliminarVenta = async (id: number): Promise<void> => {
  const resp = await fetch(`${URL_VENTAS}/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Error al eliminar la venta");
};

// Detalles de venta
export const listarDetallesPorVenta = async (ventaId: number): Promise<DetalleVenta[]> => {
  const resp = await fetch(`${URL_DETALLES}/venta/${ventaId}`);
  if (!resp.ok) throw new Error("Error al listar detalles");
  return resp.json();
};

export const crearDetalleVenta = async (detalle: DetalleVenta): Promise<DetalleVenta> => {
  const resp = await fetch(URL_DETALLES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detalle),
  });
  if (!resp.ok) throw new Error("Error al crear detalle de venta");
  return resp.json();
};

export const actualizarDetalleVenta = async (id: number, detalle: DetalleVenta): Promise<DetalleVenta> => {
  const resp = await fetch(`${URL_DETALLES}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detalle),
  });
  if (!resp.ok) throw new Error("Error al actualizar detalle de venta");
  return resp.json();
};

export const eliminarDetalleVenta = async (id: number): Promise<void> => {
  const resp = await fetch(`${URL_DETALLES}/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Error al eliminar detalle de venta");
};
