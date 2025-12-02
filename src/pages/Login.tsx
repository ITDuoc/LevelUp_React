import React from "react";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { correo, setCorreo, contrasenia, setContrasenia, error, cargando, handleLogin } = useLogin();

  return (
    <LoginForm
      correo={correo}
      setCorreo={setCorreo}
      contrasenia={contrasenia}
      setContrasenia={setContrasenia}
      error={error}
      cargando={cargando}
      onSubmit={handleLogin}
    />
  );
}
