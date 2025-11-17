import React from "react";
import { useCuenta } from "../hooks/useCuenta";
import CuentaCard from "../components/CuentaCard";
import HistorialCompras from "../components/HistorialCompras";
import EditarPerfilModal from "../components/EditarPerfilModal";

export default function Cuenta() {
  const {
    cliente,
    misVentas,
    mostrarModal,
    setMostrarModal,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    direccion,
    setDireccion,
    fechaNac,
    setFechaNac,
    imagen,
    handleImagenChange,
    errores,
    handleGuardar,
  } = useCuenta();

  if (!cliente) return <p className="text-center mt-4">Debes iniciar sesión</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Mi Cuenta</h1>
      <CuentaCard cliente={cliente} onEditar={() => setMostrarModal(true)} />
      <h3>Historial de compras</h3>
      <HistorialCompras ventas={misVentas} />
      <EditarPerfilModal
        mostrar={mostrarModal}
        onCerrar={() => setMostrarModal(false)}
        nombre={nombre}
        setNombre={setNombre}
        apellido={apellido}
        setApellido={setApellido}
        correo={correo}
        setCorreo={setCorreo}
        telefono={telefono}
        setTelefono={setTelefono}
        direccion={direccion}
        setDireccion={setDireccion}
        fechaNac={fechaNac}
        setFechaNac={setFechaNac}
        imagen={imagen}
        handleImagenChange={handleImagenChange}
        errores={errores}
        onGuardar={handleGuardar}
      />
    </div>
  );
}
