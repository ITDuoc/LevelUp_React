import { useState } from "react";
import type { UserRole } from "../context/UserRoles";
import { useUser, type User } from "../context/UserContext";
import { clientes } from "../services/DatosSimulados";

export function useRegistro() {
  const { login } = useUser();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [idComuna, setIdComuna] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [rol, setRol] = useState<UserRole>("cliente");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);

    const correoLower = correo.trim().toLowerCase();

    const usuarioExistente = clientes.find(
      (c) => c.correo_cliente.toLowerCase() === correoLower
    );

    if (usuarioExistente) {
      setError("Ya existe un usuario con este correo.");
      setLoading(false);
      return;
    }

    if (rol === "cliente") {
      clientes.push({
        id_cliente: clientes.length + 1,
        nombre_cliente: nombre,
        apellido_cliente: apellido,
        correo_cliente: correoLower,
        contrasenia_cliente: contrasenia,
        telefono,
        direccion,
        id_comuna: parseInt(idComuna) || 0,
        fecha_nac_cliente: fechaNac,
      });
    }

    const usuario: User = {
      nombre: `${nombre} ${apellido}`,
      correo: correoLower,
      rol,
    };

    login(usuario);
    setLoading(false);
  };

  return {
    nombre, setNombre,
    apellido, setApellido,
    correo, setCorreo,
    contrasenia, setContrasenia,
    telefono, setTelefono,
    direccion, setDireccion,
    idComuna, setIdComuna,
    fechaNac, setFechaNac,
    rol, setRol,
    loading,
    error,
    onSubmit,
  };
}
