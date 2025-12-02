import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import type { Producto } from "../services/interfaces";

export function useCarritoProducto(producto: Producto | null) {
  const { user } = useUser();
  const { agregarProducto } = useCart();

  const [cantidad, setCantidad] = useState<number>(1);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = () => {
    if (!user) {
      setMensaje("Debes iniciar sesión para agregar al carrito");
      setTimeout(() => setMensaje(null), 3000);
      return;
    }
    if (!producto) return;
    agregarProducto(producto, cantidad);
    setMensaje(`Agregaste ${cantidad} ${producto.nombre_producto} al carrito`);
    setTimeout(() => setMensaje(null), 3000);
  };

  return {
    cantidad,
    aumentarCantidad,
    disminuirCantidad,
    agregarAlCarrito,
    mensaje,
    setMensaje,
  };
}
