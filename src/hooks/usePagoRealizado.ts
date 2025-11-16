import { useEffect, useState } from "react";
import { useCarrito } from "./useCarrito";
import type { Pedido } from "../services/pedidoService";
import * as pedidoService from "../services/pedidoService";

export function usePagoRealizado() {
  const { carrito, vaciarCarrito, totalCarrito } = useCarrito();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const procesarPago = async () => {
      if (carrito.length === 0) return;

      // Guardar pedido (localStorage)
      const nuevoPedido = await pedidoService.guardarPedido(carrito, totalCarrito);
      setPedido(nuevoPedido);

      // Limpiar carrito
      await vaciarCarrito();
    };
    procesarPago();
  }, []); 

  return { pedido };
}