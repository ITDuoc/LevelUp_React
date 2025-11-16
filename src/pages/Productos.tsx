import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useFiltros } from "../hooks/useFiltros";
import ProductoCard from "../components/ProductoCard";
import Toast from "../components/Toast";

export default function Productos() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaQuery = params.get("categoria") || "";

  const {
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
  } = useProductos();

  const {
    categoriasSeleccionadas,
    setCategoriasSeleccionadas,
    marcasSeleccionadas,
    setMarcasSeleccionadas,
    handleCheckbox
  } = useFiltros(
    categorias.map(c => c.nombre_categoria),
    marcas.map(m => m.nombre_marca)
  );

  const [busqueda, setBusqueda] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState<"asc" | "desc" | "ninguno">("ninguno");

  // Seleccionar automaticamente la categoria de la URL
  useEffect(() => {
    if (categoriaQuery) {
      setCategoriasSeleccionadas([categoriaQuery]);
    }
  }, [categoriaQuery, setCategoriasSeleccionadas]);

  const productosFiltrados = productos
    .filter(p =>
      (!busqueda || p.nombre_producto.toLowerCase().includes(busqueda.toLowerCase())) &&
      (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categorias.find(c => c.id_categoria === p.id_categoria)?.nombre_categoria!)) &&
      (marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(marcas.find(m => m.id_marca === p.id_marca)?.nombre_marca!))
    )
    .sort((a, b) => {
      if (ordenPrecio === "asc") return a.precio - b.precio;
      if (ordenPrecio === "desc") return b.precio - a.precio;
      return 0;
    });

  if (productoSeleccionado) {
    const marca = marcas.find(m => m.id_marca === productoSeleccionado.id_marca)?.nombre_marca;
    const categoria = categorias.find(c => c.id_categoria === productoSeleccionado.id_categoria)?.nombre_categoria;

    return (
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={() => setProductoSeleccionado(null)}>Volver</button>
        <div className="row">
          <div className="col-md-6">
            <img src={productoSeleccionado.imagen_producto} alt={productoSeleccionado.nombre_producto} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{productoSeleccionado.nombre_producto}</h2>
            <p className="text-muted">{marca}</p>
            <p className="small">{categoria}</p>
            <p>{productoSeleccionado.descripcion_producto}</p>
            <h4 className="fw-bold">${productoSeleccionado.precio.toLocaleString()}</h4>

            <div className="d-flex align-items-center my-3">
              <button className="btn btn-outline-secondary" onClick={disminuirCantidad}>-</button>
              <span className="mx-3">{cantidad}</span>
              <button className="btn btn-outline-secondary" onClick={aumentarCantidad}>+</button>
            </div>

            <button className="btn btn-primary mt-3" onClick={agregarAlCarrito}>
              Agregar {cantidad} al carrito
            </button>
          </div>
        </div>

        <Toast mensaje={mensaje} onClose={() => setMensaje(null)} />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Productos</h1>

      <div className="row mb-3">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={ordenPrecio}
            onChange={e => setOrdenPrecio(e.target.value as any)}
          >
            <option value="ninguno">Ordenar por precio</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-3">
          <div className="cardSimple p-3 sticky-top" style={{ top: 80, height: 500, overflowY: "auto" }}>
            <h5>Filtros</h5>

            <div className="mb-3">
              <strong>Categoría</strong>
              {categorias.map(cat => (
                <div className="form-check" key={cat.nombre_categoria}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={cat.nombre_categoria}
                    checked={categoriasSeleccionadas.includes(cat.nombre_categoria)}
                    onChange={() => handleCheckbox(cat.nombre_categoria, categoriasSeleccionadas, setCategoriasSeleccionadas)}
                  />
                  <label className="form-check-label">{cat.nombre_categoria}</label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <strong>Marca</strong>
              {marcas.map(m => (
                <div className="form-check" key={m.nombre_marca}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={m.nombre_marca}
                    checked={marcasSeleccionadas.includes(m.nombre_marca)}
                    onChange={() => handleCheckbox(m.nombre_marca, marcasSeleccionadas, setMarcasSeleccionadas)}
                  />
                  <label className="form-check-label">{m.nombre_marca}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="row">
            {productosFiltrados.length === 0 ? (
              <p>No se encontraron productos con los filtros o búsqueda.</p>
            ) : (
              productosFiltrados.map(prod => (
                <ProductoCard
                  key={prod.id_producto}
                  producto={prod}
                  marca={marcas.find(m => m.id_marca === prod.id_marca)?.nombre_marca}
                  categoria={categorias.find(c => c.id_categoria === prod.id_categoria)?.nombre_categoria}
                  onSelect={setProductoSeleccionado}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Toast mensaje={mensaje} onClose={() => setMensaje(null)} />
    </div>
  );
}
