import { useState, useEffect } from "react";
import type { Producto, Marca, Categoria } from "../interfaces/Producto";
import { listarProductos, listarMarcas, listarCategorias } from "../services/productosService";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const { user } = useUser();
  const { agregarProducto } = useCart();

  useEffect(() => {
    let mounted = true;

    const cargarDatos = async () => {
      try {
        const [prod, mar, cat] = await Promise.all([
          listarProductos(),
          listarMarcas(),
          listarCategorias(),
        ]);

        const normalizados = prod
          .filter(p => p.estadoProducto === 1) 
          .map((p: Producto) => ({
            ...p,
            categoria: p.categoria ?? null,
            marca: p.marca ?? null,
          }));

        if (mounted) {
          setProductos(normalizados);
          setMarcas(mar);
          setCategorias(cat);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Error al cargar productos/marcas/categorías");
          setLoading(false);
        }
      }
    };

    cargarDatos();
    return () => { mounted = false; };
  }, []);

  // Funciones de carrito
  const aumentarCantidad = () => setCantidad(prev => prev + 1);
  const disminuirCantidad = () => setCantidad(prev => Math.max(prev - 1, 1));

  const agregarAlCarrito = () => {
    if (!user) {
      setMensaje("Debe iniciar sesión para añadir productos al carrito");
      return;
    }

    if (productoSeleccionado) {
      agregarProducto(productoSeleccionado, cantidad);
      setMensaje(`Agregaste ${cantidad} producto(s) de "${productoSeleccionado.nomProducto}" al carrito`);
    }
  };

  return {
    productos,
    marcas,
    categorias,
    loading,
    error,
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
