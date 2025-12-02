import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Producto } from "../interfaces/Producto"; 

export type CartItem = {
  producto: Producto;
  cantidad: number;
  total: number;
};

export type CartContextType = {
  carrito: CartItem[];
  agregarProducto: (producto: Producto, cantidad: number) => void;
  eliminarProducto: (idProducto: number) => void;
  actualizarCantidad: (idProducto: number, cantidad: number) => void;
  totalCantidad: number;
  vaciarCarrito: () => void;
  sincronizarCarrito: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const agregarProducto = (producto: Producto, cantidad: number) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.producto.idProducto === producto.idProducto);

      if (existe) {
        return prev.map(item =>
          item.producto.idProducto === producto.idProducto
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
                total: (item.cantidad + cantidad) * producto.precioProducto,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          producto,
          cantidad,
          total: producto.precioProducto * cantidad,
        },
      ];
    });
  };

  const eliminarProducto = (idProducto: number) => {
    setCarrito(prev => prev.filter(item => item.producto.idProducto !== idProducto));
  };

  const actualizarCantidad = (idProducto: number, cantidad: number) => {
    if (cantidad < 1) return;
    setCarrito(prev =>
      prev.map(item =>
        item.producto.idProducto === idProducto
          ? { ...item, cantidad, total: cantidad * item.producto.precioProducto }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const sincronizarCarrito = (items: CartItem[]) => setCarrito(items);

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
        sincronizarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
