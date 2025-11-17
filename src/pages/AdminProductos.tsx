import React from "react";
import { useAdminProductos } from "../hooks/useAdminProductos";
import ProductoModal from "../components/ProductoModal";

export default function AdminProductos() {
  const {
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
  } = useAdminProductos();

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Productos</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
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
          setShowModal(true);
          setEditProducto(null);
        }}
      >
        Agregar Producto
      </button>

      <div className="cardSimple p-3 mb-3">
        <div className="table-responsive">
          <table className="table table-dark table-striped mb-0" style={{ borderRadius: "10px", overflow: "hidden", border: "2px solid var(--color-morado)" }}>
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
                <tr key={p.id_producto}>
                  <td>{p.nombre_producto}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>{p.estado_producto ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEditar(p)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.id_producto)}>Eliminar</button>
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
        errores={errores}
        setProducto={setEditProducto!}
        setNuevoProducto={setNuevoProducto}
        onGuardar={handleGuardar}
        onAgregar={handleAgregar}
      />
    </div>
  );
}
