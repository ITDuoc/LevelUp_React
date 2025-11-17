import { useState } from "react";
import type { Producto } from "../services/interfaces";
import { useCart } from "../context/CartContext";

export function useCarrito() {
  const {
    carrito,
    agregarProducto: agregarProductoContext,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCart();

  const [mensaje, setMensaje] = useState<string | null>(null);

  // Funcion para agregar producto con mensaje
  const agregarProducto = async (producto: Producto, cantidad: number) => {
    await agregarProductoContext(producto, cantidad);
    setMensaje(`Agregaste ${cantidad} ${producto.nombre_producto} al carrito`);
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + item.total, 0);

  return {
    carrito,
    mensaje,
    setMensaje,
    totalCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
  };
}
