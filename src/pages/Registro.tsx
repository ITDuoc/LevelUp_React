import React from "react";
import { useRegistro } from "../hooks/useRegistro";
import RegistroForm from "../components/RegistroForm";
import Toast from "../components/Toast";

export default function Registro() {
  const registro = useRegistro();

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Crear cuenta</h2>
      <RegistroForm
        {...registro}
        onSubmit={registro.onSubmit} 
      />

      {/* Toast */}
      <Toast
        mensaje={registro.toastMensaje}
        onClose={() => registro.setToastMensaje(null)}
      />
    </div>
  );
}
