import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UsuarioEditable } from "../interfaces/UsuarioBackend";

export function useRegistro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [fechaNac, setFechaNac] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para el toast
  const [toastMensaje, setToastMensaje] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const roleCliente = { idRol: 2, nomRol: "cliente" };
      const fechaFormato = fechaNac || "1995-01-01";

      const nuevoUsuario: Omit<UsuarioEditable, "idUsuario"> = {
        nomUsuario: nombre,
        apeUsuario: apellido,
        correoUsuario: correo,
        passUsuario: contrasenia,
        fechaNacUsuario: fechaFormato,
        estadoUsuario: 1,
        imgUsuario: "https://i.pinimg.com/736x/eb/1a/04/eb1a04654126b182ac94ccc9517bc464.jpg",
        roles: [roleCliente],
      };

      const resp = await fetch("http://localhost:8082/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Error ${resp.status}: ${txt}`);
      }

      
      setToastMensaje("Usuario creado con éxito");

      setNombre("");
      setApellido("");
      setCorreo("");
      setContrasenia("");
      setFechaNac("");

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
      setToastMensaje(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return {
    nombre, setNombre,
    apellido, setApellido,
    correo, setCorreo,
    contrasenia, setContrasenia,
    fechaNac, setFechaNac,
    loading,
    error,
    toastMensaje,       
    setToastMensaje,     
    onSubmit: handleSubmit,
  };
}
