import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useCarrito } from "../hooks/useCarrito";
import { useZona, Region, Ciudad, Comuna } from "../hooks/useZona";
import { useNavigate } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import CarritoResumen from "../components/CarritoResumen";
import Toast from "../components/Toast";

interface MetodoPago {
  id: number;
  nombre: string;
}

export default function Carrito() {
  const { user } = useUser();
  const { carrito, totalCarrito, mensaje, setMensaje, actualizarCantidad, eliminarProducto, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  // Hook de zonas
  const {
    regiones,
    ciudadesFiltradas,
    comunasFiltradas,
    loading,
    error,
    regionSeleccionada,
    setRegionSeleccionada,
    ciudadSeleccionada,
    setCiudadSeleccionada
  } = useZona();

  const [comunaSeleccionada, setComunaSeleccionada] = useState<number | null>(null);
  const [calleNumero, setCalleNumero] = useState<string>("");

  // Estado para metodo de pago
  const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<number | null>(null);

  // Cargar metodos de pago
  React.useEffect(() => {
    fetch("http://localhost:8083/metodos-pago")
      .then(res => res.json())
      .then(data => setMetodosPago(data))
      .catch(() => setMensaje("Error cargando métodos de pago"));
  }, []);

  const handleCheckout = async () => {
    if (!user) return;

    if (!regionSeleccionada || !ciudadSeleccionada || !comunaSeleccionada || !calleNumero) {
      setMensaje("Debes completar la dirección de envío.");
      return;
    }
    if (!metodoSeleccionado) {
      setMensaje("Debes seleccionar un método de pago.");
      return;
    }

    const dirEnvio = `${calleNumero}, ${comunasFiltradas.find(c => c.id === comunaSeleccionada)?.nombre}, ${ciudadesFiltradas.find(c => c.id === ciudadSeleccionada)?.nombre}, ${regiones.find(r => r.id === regionSeleccionada)?.nombre}`;

    const venta = {
      fechaVenta: new Date(),
      dirEnvio,
      totalVenta: totalCarrito,
      idUsuario: user.idUsuario, 
      idMetodoPago: metodoSeleccionado,
      idEstadoVenta: 1, 
      detalles: carrito.map(item => ({
        idProducto: item.producto.idProducto,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precioProducto,
        subtotal: item.total
      }))
    };

    try {
      const res = await fetch("http://localhost:8083/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venta)
      });
      if (!res.ok) throw new Error("Error al procesar la venta");
      vaciarCarrito();
      navigate("/pago-realizado");
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo completar la compra. Intenta nuevamente.");
    }
  };

  if (!user) return <p className="text-center mt-4">Debes iniciar sesión</p>;
  if (carrito.length === 0) return <p className="text-center mt-4">Tu carrito está vacío</p>;
  if (loading) return <p className="text-center mt-4">Cargando zonas...</p>;
  if (error) return <p className="text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Mi Carrito</h1>

      <div className="list-group mb-3">
        {carrito.map(item => (
          <CarritoItem
            key={item.producto.idProducto}
            item={item}
            onActualizarCantidad={actualizarCantidad}
            onEliminar={eliminarProducto}
          />
        ))}
      </div>

      <div className="mb-3">
        <h5>Dirección de envío</h5>
        <div className="row mb-2">
          <div className="col">
            <select className="form-select" value={regionSeleccionada ?? ""} onChange={e => setRegionSeleccionada(Number(e.target.value))}>
              <option value="">Seleccione Región</option>
              {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
          <div className="col">
            <select className="form-select" value={ciudadSeleccionada ?? ""} onChange={e => setCiudadSeleccionada(Number(e.target.value))}>
              <option value="">Seleccione Ciudad</option>
              {ciudadesFiltradas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="col">
            <select className="form-select" value={comunaSeleccionada ?? ""} onChange={e => setComunaSeleccionada(Number(e.target.value))}>
              <option value="">Seleccione Comuna</option>
              {comunasFiltradas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Calle y número"
          value={calleNumero}
          onChange={e => setCalleNumero(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <h5>Método de pago</h5>
        <select className="form-select" value={metodoSeleccionado ?? ""} onChange={e => setMetodoSeleccionado(Number(e.target.value))}>
          <option value="">Seleccione Método de Pago</option>
          {metodosPago.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
      </div>

      <CarritoResumen
        total={totalCarrito}
        onVaciarCarrito={vaciarCarrito}
        onCheckout={handleCheckout}
      />

      <Toast mensaje={mensaje} onClose={() => setMensaje(null)} />
    </div>
  );
}
