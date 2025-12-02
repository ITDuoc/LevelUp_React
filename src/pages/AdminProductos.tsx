import React from "react";
import { useAdminProductos } from "../hooks/useAdminProductos";
import ProductoModal from "../components/ProductoModal";
import type { Producto } from "../interfaces/Producto";

export default function AdminProductos() {
  const {
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
  } = useAdminProductos();

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

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Productos</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setNuevoProducto({ ...initialProducto });
          setEditProducto(null);
          setShowModal(true);
        }}
      >
        Agregar Producto
      </button>

      <div className="cardSimple p-3 mb-3">
        <div className="table-responsive">
          <table className="table table-dark table-striped mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.idProducto}>
                  <td>{p.nomProducto}</td>
                  <td>${p.precioProducto}</td>
                  <td>{p.stockProducto}</td>
                  <td>{p.estadoProducto === 1 ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEditar(p)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.idProducto)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        producto={editProducto}
        nuevoProducto={nuevoProducto}
        categorias={categorias}
        marcas={marcas}
        errores={errores}
        setProducto={setEditProducto!}
        setNuevoProducto={setNuevoProducto}
        onGuardar={handleGuardar}
        onAgregar={handleAgregar}
      />
    </div>
  );
}
