import React from "react";
import { useCuenta } from "../hooks/useCuenta";
import HistorialCompras from "../components/HistorialCompras";
import { useUser } from "../context/UserContext";
import CuentaCard from "../components/CuentaCard";

export default function Cuenta() {
  const { user } = useUser();
  const { ventas, loading } = useCuenta();

  if (!user) return <p className="text-center mt-4">Debes iniciar sesión</p>;
  if (loading) return <p className="text-center mt-4">Cargando información...</p>;

  return (
    <div className="container mt-4">
      <h1>Mi Cuenta</h1>

      <CuentaCard user={user} />

      <HistorialCompras ventas={ventas} />
    </div>
  );
}
