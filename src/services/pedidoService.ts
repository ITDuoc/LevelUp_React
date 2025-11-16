import type { CarritoItem } from "./carritoService";

const STORAGE_KEY = "pedidos";

export interface Pedido {
  id: string; // ID único del pedido
  fecha: string; // fecha de la compra
  items: CarritoItem[];
  total: number;
}

export const guardarPedido = async (items: CarritoItem[], total: number): Promise<Pedido> => {
  const pedido: Pedido = {
    id: Date.now().toString(),
    fecha: new Date().toISOString(),
    items,
    total,
  };

  const pedidosPrevios: Pedido[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  pedidosPrevios.push(pedido);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosPrevios));

  return pedido;
};

export const obtenerPedidos = async (): Promise<Pedido[]> => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};
