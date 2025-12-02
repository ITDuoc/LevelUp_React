import React from "react";
import type { Producto, Categoria, Marca } from "../interfaces/Producto";

interface Props {
  show: boolean;
  onClose: () => void;
  producto?: Producto | null;
  nuevoProducto: Producto;
  categorias: Categoria[];
  marcas: Marca[];
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
  categorias,
  marcas,
  errores,
  setProducto,
  setNuevoProducto,
  onGuardar,
  onAgregar
}: Props) {
  if (!show) return null;

  const handleChange = (field: keyof Producto, value: any) => {
    if (producto) setProducto({ ...producto, [field]: value });
    else setNuevoProducto({ ...nuevoProducto, [field]: value });
  };

  const handleCategoriaChange = (categoriaId: number) => {
    const cat = categorias.find(c => c.idCategoria === categoriaId) || null;
    if (producto) setProducto({ ...producto, categoria: cat });
    else setNuevoProducto({ ...nuevoProducto, categoria: cat });
  };

  const handleMarcaChange = (marcaId: number) => {
    const mar = marcas.find(m => m.idMarca === marcaId) || null;
    if (producto) setProducto({ ...producto, marca: mar });
    else setNuevoProducto({ ...nuevoProducto, marca: mar });
  };

  const currentProducto = producto ?? nuevoProducto;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cardSimple p-3">
          <h5>{producto ? "Editar Producto" : "Agregar Producto"}</h5>

          <div className="mb-2">
            <label>Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nomProducto ? "is-invalid" : ""}`}
              value={currentProducto.nomProducto}
              onChange={e => handleChange("nomProducto", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Precio</label>
            <input
              type="number"
              min={0}
              className={`form-control ${errores.precioProducto ? "is-invalid" : ""}`}
              value={currentProducto.precioProducto}
              onChange={e => handleChange("precioProducto", Number(e.target.value))}
            />
          </div>

          <div className="mb-2">
            <label>Stock</label>
            <input
              type="number"
              min={0}
              className={`form-control ${errores.stockProducto ? "is-invalid" : ""}`}
              value={currentProducto.stockProducto}
              onChange={e => handleChange("stockProducto", Number(e.target.value))}
            />
          </div>

          <div className="mb-2">
            <label>Estado</label>
            <select
              className="form-control"
              value={currentProducto.estadoProducto === 1 ? "1" : "0"}
              onChange={e => handleChange("estadoProducto", Number(e.target.value))}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>

          <div className="mb-2">
            <label>Imagen</label>
            <input
              type="text"
              className={`form-control ${errores.imgProducto ? "is-invalid" : ""}`}
              value={currentProducto.imgProducto}
              onChange={e => handleChange("imgProducto", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Categoría</label>
            <select
              className={`form-control ${errores.categoria ? "is-invalid" : ""}`}
              value={currentProducto.categoria?.idCategoria ?? ""}
              onChange={e => handleCategoriaChange(Number(e.target.value))}
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias.map(c => (
                <option key={c.idCategoria} value={c.idCategoria}>
                  {c.nomCategoria}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label>Marca</label>
            <select
              className={`form-control ${errores.marca ? "is-invalid" : ""}`}
              value={currentProducto.marca?.idMarca ?? ""}
              onChange={e => handleMarcaChange(Number(e.target.value))}
            >
              <option value="" disabled>Seleccione una marca</option>
              {marcas.map(m => (
                <option key={m.idMarca} value={m.idMarca}>
                  {m.nomMarca}
                </option>
              ))}
            </select>
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
