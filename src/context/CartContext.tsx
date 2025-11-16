import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Producto } from "../services/interfaces";

export type CartItem = {
  producto: Producto;
  cantidad: number;
  total: number;
};

export type CartContextType = {
  carrito: CartItem[];
  agregarProducto: (producto: Producto, cantidad: number) => void;
  eliminarProducto: (id_producto: number) => void;
  actualizarCantidad: (id_producto: number, cantidad: number) => void;
  totalCantidad: number;
  vaciarCarrito: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const agregarProducto = (producto: Producto, cantidad: number) => {
    setCarrito(prev => {
      const existe = prev.find(
        item => item.producto.id_producto === producto.id_producto
      );

      if (existe) {
        return prev.map(item =>
          item.producto.id_producto === producto.id_producto
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
                total: (item.cantidad + cantidad) * producto.precio,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          producto,
          cantidad,
          total: producto.precio * cantidad,
        },
      ];
    });
  };

  const eliminarProducto = (id_producto: number) => {
    setCarrito(prev =>
      prev.filter(item => item.producto.id_producto !== id_producto)
    );
  };

  const actualizarCantidad = (id_producto: number, cantidad: number) => {
    if (cantidad < 1) return;

    setCarrito(prev =>
      prev.map(item =>
        item.producto.id_producto === id_producto
          ? {
              ...item,
              cantidad,
              total: cantidad * item.producto.precio,
            }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        totalCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
