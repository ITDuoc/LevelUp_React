import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegistro } from "../hooks/useRegistro";
import RegistroForm from "../components/RegistroForm";

export default function Registro() {
  const registro = useRegistro();
  const navigate = useNavigate();

  
  React.useEffect(() => {
    if (!registro.error && registro.loading === false && registro.nombre && registro.apellido) {
      
      navigate("/cuenta");
    }
  }, [registro.error, registro.loading]);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Crear cuenta (simulado)</h2>
      <RegistroForm {...registro} />
    </div>
  );
}
