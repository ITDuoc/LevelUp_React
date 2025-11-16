import type { Producto } from "./interfaces";

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  total: number;
}

// Carrito simulado en memoria
let carrito: CarritoItem[] = [];

export const obtenerCarrito = async (): Promise<CarritoItem[]> => {
  return [...carrito];
};

export const agregarProducto = async (producto: Producto, cantidad: number): Promise<void> => {
  const index = carrito.findIndex(item => item.producto.id_producto === producto.id_producto);
  if (index >= 0) {
    carrito[index].cantidad += cantidad;
    carrito[index].total = carrito[index].cantidad * producto.precio;
  } else {
    carrito.push({ producto, cantidad, total: cantidad * producto.precio });
  }
};

export const actualizarCantidad = async (productoId: number, cantidad: number): Promise<void> => {
  const index = carrito.findIndex(item => item.producto.id_producto === productoId);
  if (index >= 0) {
    carrito[index].cantidad = Math.max(1, cantidad);
    carrito[index].total = carrito[index].cantidad * carrito[index].producto.precio;
  }
};

export const eliminarProducto = async (productoId: number): Promise<void> => {
  carrito = carrito.filter(item => item.producto.id_producto !== productoId);
};

export const vaciarCarrito = async (): Promise<void> => {
  carrito = [];
};
