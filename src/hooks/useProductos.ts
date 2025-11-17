import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import type { Producto, Marca, Categoria } from "../services/interfaces";
import { leerProductos } from "../services/productosService";
import { leerMarcas } from "../services/marcasService";
import { leerCategorias } from "../services/categoriasService";

export function useProductos() {
  const { user } = useUser();
  const { agregarProducto } = useCart();

  // Estados principales
  const [productos, setProductos] = useState<Producto[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar datos de servicios
  useEffect(() => {
    const cargarDatos = async () => {
      const [prod, mar, cat] = await Promise.all([
        leerProductos(),
        leerMarcas(),
        leerCategorias(),
      ]);
      setProductos(prod);
      setMarcas(mar);
      setCategorias(cat);
    };
    cargarDatos();
  }, []);

  // Control de cantidad
  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  // Agregar producto al carrito
  const agregarAlCarrito = () => {
    if (!user) {
      setMensaje("Debes iniciar sesión para agregar al carrito");
      setTimeout(() => setMensaje(null), 3000);
      return;
    }
    if (!productoSeleccionado) return;

    agregarProducto(productoSeleccionado, cantidad);
    setMensaje(`Agregaste ${cantidad} ${productoSeleccionado.nombre_producto} al carrito`);
    setTimeout(() => setMensaje(null), 3000);
  };

  return {
    productos,
    marcas,
    categorias,
    productoSeleccionado,
    setProductoSeleccionado,
    cantidad,
    aumentarCantidad,
    disminuirCantidad,
    agregarAlCarrito,
    mensaje,
    setMensaje,
  };
}
