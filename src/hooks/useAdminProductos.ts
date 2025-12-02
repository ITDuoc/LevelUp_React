import { useState, useEffect } from "react";
import type { Producto, Categoria, Marca } from "../interfaces/Producto";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  listarCategorias,
  listarMarcas
} from "../services/productosService";

export function useAdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProducto, setEditProducto] = useState<Producto | null>(null);

  const initialProducto: Producto = {
    idProducto: 0,
    nomProducto: "",
    precioProducto: 0,
    stockProducto: 0,
    estadoProducto: 1,
    imgProducto: "",
    categoria: null,
    marca: null,
  };
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({ ...initialProducto });
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [prod, cats, mars] = await Promise.all([
          listarProductos(),
          listarCategorias(),
          listarMarcas()
        ]);

        const normalizados = prod.map(p => ({
          ...p,
          categoria: p.categoria ?? null,
          marca: p.marca ?? null,
        }));

        setProductos(normalizados);
        setCategorias(cats);
        setMarcas(mars);
      } catch (err) {
        console.error("Error al cargar productos/categorías/marcas:", err);
      }
    };
    cargarDatos();
  }, []);

  // Validación
  const validarProducto = (p: Producto) => {
    const e: Record<string, string> = {};
    let ok = true;

    if (!p.nomProducto) { e.nomProducto = "Nombre obligatorio"; ok = false; }
    if (p.precioProducto <= 0) { e.precioProducto = "Precio debe ser mayor que 0"; ok = false; }
    if (p.stockProducto < 0) { e.stockProducto = "Stock no puede ser negativo"; ok = false; }
    if (!p.categoria?.idCategoria) { e.categoria = "Debe seleccionar categoría"; ok = false; }
    if (!p.marca?.idMarca) { e.marca = "Debe seleccionar marca"; ok = false; }

    setErrores(e);
    return ok;
  };

  // Crear producto
  const handleAgregar = async () => {
    if (!validarProducto(nuevoProducto)) return;

    try {
      const cat = categorias.find(c => c.idCategoria === nuevoProducto.categoria?.idCategoria);
      const mar = marcas.find(m => m.idMarca === nuevoProducto.marca?.idMarca);
      if (!cat || !mar) return;

      const creado = await crearProducto({ ...nuevoProducto, categoria: cat, marca: mar });
      setProductos(prev => [...prev, creado]);
      setShowModal(false);
      setNuevoProducto({ ...initialProducto });
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  };

  // Guardar edición
  const handleGuardar = async () => {
    if (!editProducto || !validarProducto(editProducto)) return;

    try {
      const cat = categorias.find(c => c.idCategoria === editProducto.categoria?.idCategoria);
      const mar = marcas.find(m => m.idMarca === editProducto.marca?.idMarca);
      if (!cat || !mar) return;

      const actualizado = await actualizarProducto(editProducto.idProducto, { ...editProducto, categoria: cat, marca: mar });
      setProductos(prev => prev.map(p => p.idProducto === actualizado.idProducto ? actualizado : p));
      setShowModal(false);
      setEditProducto(null);
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };

  const handleEditar = (p: Producto) => {
    setEditProducto(p);
    setShowModal(true);
  };

  // Soft delete: marcar como inactivo en vez de eliminar
  const handleEliminar = async (id: number) => {
    try {
      const producto = productos.find(p => p.idProducto === id);
      if (!producto) return;

      const actualizado = { ...producto, estadoProducto: 0 };

      await actualizarProducto(id, actualizado);

      setProductos(prev => prev.map(p => p.idProducto === id ? actualizado : p));
    } catch (err) {
      console.error("Error al inactivar producto:", err);
      alert("No se pudo inactivar el producto");
    }
  };

  return {
    productos,
    categorias,
    marcas,
    showModal,
    editProducto,
    nuevoProducto,
    errores,
    setShowModal,
    setEditProducto,
    setNuevoProducto,
    handleAgregar,
    handleGuardar,
    handleEditar,
    handleEliminar
  };
}
