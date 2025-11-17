import { useState } from "react";
import { useUser } from "../context/UserContext";
import { loginSimulado } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../context/UserRoles";

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

    // Redireccion segun rol usando ROLES
    switch (usuario.rol) {
      case ROLES.CLIENTE:
        navigate("/cuenta");
        break;
      case ROLES.ADMIN:
        navigate("/admin");
        break;
      default:
        navigate("/"); 
        break;
    }
  };

  return { correo, setCorreo, contrasenia, setContrasenia, error, cargando, handleLogin };
}
