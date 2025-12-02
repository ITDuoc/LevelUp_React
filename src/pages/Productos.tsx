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
    productoSeleccionado,
    setProductoSeleccionado,
    cantidad,
    aumentarCantidad,
    disminuirCantidad,
    agregarAlCarrito,
    mensaje,
    setMensaje,
  } = useProductos();

  // Filtrar null 
  const categorias = Array.from(
    new Map(
      productos
        .map(p => p.categoria)
        .filter((c): c is NonNullable<typeof c> => c !== null)
        .map(c => [c.idCategoria, c])
    ).values()
  );

  const marcas = Array.from(
    new Map(
      productos
        .map(p => p.marca)
        .filter((m): m is NonNullable<typeof m> => m !== null)
        .map(m => [m.idMarca, m])
    ).values()
  );

  // Hook de filtros
  const {
    categoriasSeleccionadas,
    marcasSeleccionadas,
    handleCheckboxCategoria,
    handleCheckboxMarca,
    filtrarProductos,
  } = useFiltros(categorias, marcas);

  const [busqueda, setBusqueda] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState<"asc" | "desc" | "ninguno">("ninguno");

  
  const [categoriaInicialAplicada, setCategoriaInicialAplicada] = useState(false);
  useEffect(() => {
    if (!categoriaInicialAplicada && categoriaQuery && productos.length > 0) {
      const cat = categorias.find(c => c.nomCategoria === categoriaQuery);
      if (cat) handleCheckboxCategoria(cat.idCategoria);
      setCategoriaInicialAplicada(true);
    }
  }, [categoriaQuery, categorias, productos, categoriaInicialAplicada, handleCheckboxCategoria]);

  
  const productosFiltrados = React.useMemo(() => {
    let filtrados = filtrarProductos(productos).filter(p =>
      !busqueda || p.nomProducto.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (ordenPrecio === "asc") filtrados = filtrados.sort((a, b) => a.precioProducto - b.precioProducto);
    if (ordenPrecio === "desc") filtrados = filtrados.sort((a, b) => b.precioProducto - a.precioProducto);

    return filtrados;
  }, [productos, filtrarProductos, busqueda, ordenPrecio]);

  if (productoSeleccionado) {
    const marca = productoSeleccionado.marca?.nomMarca;
    const categoria = productoSeleccionado.categoria?.nomCategoria;

    return (
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={() => setProductoSeleccionado(null)}>Volver</button>
        <div className="row">
          <div className="col-md-6">
            <img src={productoSeleccionado.imgProducto} alt={productoSeleccionado.nomProducto} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{productoSeleccionado.nomProducto}</h2>
            <p className="text-muted">{marca}</p>
            <p className="small">{categoria}</p>
            <h4 className="fw-bold">${productoSeleccionado.precioProducto.toLocaleString()}</h4>

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
            onChange={e => setOrdenPrecio(e.target.value as "asc" | "desc" | "ninguno")}
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
                <div className="form-check" key={cat.idCategoria}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={categoriasSeleccionadas.includes(cat.idCategoria)}
                    onChange={() => handleCheckboxCategoria(cat.idCategoria)}
                  />
                  <label className="form-check-label">{cat.nomCategoria}</label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <strong>Marca</strong>
              {marcas.map(m => (
                <div className="form-check" key={m.idMarca}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={marcasSeleccionadas.includes(m.idMarca)}
                    onChange={() => handleCheckboxMarca(m.idMarca)}
                  />
                  <label className="form-check-label">{m.nomMarca}</label>
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
                  key={prod.idProducto}
                  producto={prod}
                  marca={prod.marca?.nomMarca}
                  categoria={prod.categoria?.nomCategoria}
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
