import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { UsuarioBackend } from "../interfaces/UsuarioBackend";
import { apiLogin } from "../services/usuariosService";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const usuario: UsuarioBackend | "ELIMINADO" | null = await apiLogin(correo, contrasenia);

      if (usuario === null) {
        setError("Correo o contraseña incorrectos");
        return;
      }

      if (usuario === "ELIMINADO") {
        setError("Usuario eliminado");
        return;
      }

      // Mapear rol según idRol
      const rolMap: Record<number, string> = {
        1: "administrador",
        2: "cliente",
        3: "vendedor",
      };
      const rol = rolMap[usuario.roles?.[0]?.idRol ?? 2] || "cliente";

      login("", usuario.idUsuario, usuario.correoUsuario, rol);

      // Redirigir según rol
      if (rol === "administrador") navigate("/admin");
      else navigate("/");

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return { correo, setCorreo, contrasenia, setContrasenia, error, cargando, handleLogin };
}
