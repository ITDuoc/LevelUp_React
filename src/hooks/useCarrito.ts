// src/hooks/useCarrito.ts
import { useState, useEffect } from "react";
import type { Producto } from "../services/interfaces";
import type { CarritoItem } from "../services/carritoService";
import * as carritoService from "../services/carritoService";

export function useCarrito() {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar carrito inicial
  useEffect(() => {
    const cargarCarrito = async () => {
      const items = await carritoService.obtenerCarrito();
      setCarrito(items);
    };
    cargarCarrito();
  }, []);

  const agregarProducto = async (producto: Producto, cantidad: number) => {
    await carritoService.agregarProducto(producto, cantidad);
    const items = await carritoService.obtenerCarrito();
    setCarrito(items);
    setMensaje(`Agregaste ${cantidad} ${producto.nombre_producto} al carrito`);
  };

  const actualizarCantidad = async (productoId: number, cantidad: number) => {
    await carritoService.actualizarCantidad(productoId, cantidad);
    const items = await carritoService.obtenerCarrito();
    setCarrito(items);
  };

  const eliminarProducto = async (productoId: number) => {
    await carritoService.eliminarProducto(productoId);
    const items = await carritoService.obtenerCarrito();
    setCarrito(items);
  };

  const vaciarCarrito = async () => {
    await carritoService.vaciarCarrito();
    setCarrito([]);
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
