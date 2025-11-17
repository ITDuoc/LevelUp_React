import React from "react";
import type { Producto } from "../services/interfaces";

interface Props {
  show: boolean;
  onClose: () => void;
  producto?: Producto | null;
  nuevoProducto: Producto;
  errores: Record<string, string>;
  setProducto: (p: Producto) => void;
  setNuevoProducto: (p: Producto) => void;
  onGuardar: () => void;
  onAgregar: () => void;
}

export default function ProductoModal({
  show,
  onClose,
  producto,
  nuevoProducto,
  errores,
  setProducto,
  setNuevoProducto,
  onGuardar,
  onAgregar,
}: Props) {
  if (!show) return null;

  const handleChange = (field: keyof Producto, value: any) => {
    if (producto) setProducto({ ...producto, [field]: value });
    else setNuevoProducto({ ...nuevoProducto, [field]: value });
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cardSimple p-3">
          <h5>{producto ? "Editar Producto" : "Agregar Producto"}</h5>

          <div className="mb-2">
            <label>Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nombre_producto ? "is-invalid" : ""}`}
              value={producto?.nombre_producto ?? nuevoProducto.nombre_producto}
              onChange={e => handleChange("nombre_producto", e.target.value)}
            />
            {errores.nombre_producto && <div className="invalid-feedback">{errores.nombre_producto}</div>}
          </div>

          <div className="mb-2">
            <label>Precio</label>
            <input
              type="number"
              min={0}
              className={`form-control ${errores.precio ? "is-invalid" : ""}`}
              value={producto?.precio ?? nuevoProducto.precio}
              onChange={e => handleChange("precio", Number(e.target.value))}
            />
            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
          </div>

          <div className="mb-2">
            <label>Stock</label>
            <input
              type="number"
              min={0}
              className={`form-control ${errores.stock ? "is-invalid" : ""}`}
              value={producto?.stock ?? nuevoProducto.stock}
              onChange={e => handleChange("stock", Number(e.target.value))}
            />
            {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
          </div>

          <div className="mb-2">
            <label>Estado</label>
            <select
              className="form-control"
              value={(producto?.estado_producto ?? nuevoProducto.estado_producto) ? "true" : "false"}
              onChange={e => handleChange("estado_producto", e.target.value === "true")}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="mb-2">
            <label>Descripción</label>
            <textarea
              className={`form-control ${errores.descripcion_producto ? "is-invalid" : ""}`}
              value={producto?.descripcion_producto ?? nuevoProducto.descripcion_producto}
              onChange={e => handleChange("descripcion_producto", e.target.value)}
            />
            {errores.descripcion_producto && <div className="invalid-feedback">{errores.descripcion_producto}</div>}
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={producto ? onGuardar : onAgregar}>
              {producto ? "Guardar cambios" : "Agregar producto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
