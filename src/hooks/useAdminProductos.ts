import { useState, useEffect } from "react";
import type { Producto } from "../services/interfaces";
import { leerProductos } from "../services/productosService";

export const useAdminProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    id_producto: Date.now(),
    nombre_producto: "",
    precio: 0,
    stock: 0,
    estado_producto: true,
    id_categoria: 0,
    id_marca: 0,
    imagen_producto: "",
    descripcion_producto: "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Cargar productos iniciales
  useEffect(() => {
    const cargarProductos = async () => {
      const data = await leerProductos();
      setProductos(data);
    };
    void cargarProductos();
  }, []);

  const validarProducto = (producto: Producto) => {
    const nuevoErrores: Record<string, string> = {};
    let valido = true;

    if (!producto.nombre_producto) { nuevoErrores.nombre_producto = "Nombre obligatorio"; valido = false; }
    if (producto.precio <= 0) { nuevoErrores.precio = "Precio debe ser positivo"; valido = false; }
    if (producto.stock < 0) { nuevoErrores.stock = "Stock debe ser 0 o mayor"; valido = false; }
    if (!producto.descripcion_producto) { nuevoErrores.descripcion_producto = "Descripción obligatoria"; valido = false; }

    setErrores(nuevoErrores);
    return valido;
  };

  const handleEditar = (producto: Producto) => {
    setEditProducto(producto);
    setErrores({});
    setShowModal(true);
  };

  const handleGuardar = async () => {
    if (editProducto && validarProducto(editProducto)) {
      setProductos(prev =>
        prev.map(p => (p.id_producto === editProducto.id_producto ? editProducto : p))
      );
      setEditProducto(null);
      setShowModal(false);
      
    }
  };

  const handleAgregar = async () => {
    if (validarProducto(nuevoProducto)) {
      setProductos(prev => [...prev, { ...nuevoProducto, id_producto: Date.now() }]);
      setNuevoProducto({
        id_producto: Date.now(),
        nombre_producto: "",
        precio: 0,
        stock: 0,
        estado_producto: true,
        id_categoria: 0,
        id_marca: 0,
        imagen_producto: "",
        descripcion_producto: "",
      });
      setShowModal(false);
      
    }
  };

  const handleEliminar = async (id: number) => {
    setProductos(prev => prev.filter(p => p.id_producto !== id));
    
  };

  return {
    productos,
    showModal,
    editProducto,
    nuevoProducto,
    errores,
    setShowModal,
    setEditProducto,
    setNuevoProducto,
    handleEditar,
    handleGuardar,
    handleAgregar,
    handleEliminar,
    validarProducto,
  };
};
