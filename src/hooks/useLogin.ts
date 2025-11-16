import { useState } from "react";
import { useUser } from "../context/UserContext";
import { loginSimulado } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const usuario = await loginSimulado(correo, contrasenia);

    if (!usuario) {
      setError("Correo o contraseña incorrectos");
      setCargando(false);
      return;
    }

    login(usuario);
    setCargando(false);

    // Redireccion segun rol
    if (usuario.rol === "cliente") navigate("/cuenta");
    else navigate("/paneladmin");
  };

  return { correo, setCorreo, contrasenia, setContrasenia, error, cargando, handleLogin };
}
