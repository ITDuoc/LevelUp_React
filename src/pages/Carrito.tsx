import React from "react";
import { useUser } from "../context/UserContext";
import { useCarrito } from "../hooks/useCarrito";
import { useNavigate } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import CarritoResumen from "../components/CarritoResumen";
import Toast from "../components/Toast";

export default function Carrito() {
  const { user } = useUser();
  const {
    carrito,
    totalCarrito,
    mensaje,
    setMensaje,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-4">Debes iniciar sesión</p>;
  if (carrito.length === 0) return <p className="text-center mt-4">Tu carrito está vacío</p>;

  const handleCheckout = () => {
    navigate("/pago-realizado");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Mi Carrito</h1>

      <div className="list-group mb-3">
        {carrito.map((item) => (
          <CarritoItem
            key={item.producto.id_producto}
            item={item}
            onActualizarCantidad={actualizarCantidad}
            onEliminar={eliminarProducto}
          />
        ))}
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
