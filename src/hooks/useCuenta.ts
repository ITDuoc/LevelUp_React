import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import type { Cliente, Venta } from "../services/interfaces";
import * as clientesService from "../services/clientesService";
import * as ventasService from "../services/ventasService";

export function useCuenta() {
  const { user } = useUser();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [misVentas, setMisVentas] = useState<Venta[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [imagen, setImagen] = useState("/images/default-user.png");

  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      const c = await clientesService.obtenerClientePorCorreo(user.correo);
      if (!c) return;

      setCliente(c);
      setNombre(c.nombre_cliente);
      setApellido(c.apellido_cliente);
      setCorreo(c.correo_cliente);
      setTelefono(c.telefono || "");
      setDireccion(c.direccion || "");
      setFechaNac(c.fecha_nac_cliente || "");
      setImagen(c.imagen_cliente || "/images/default-user.png");

      const ventas = await ventasService.obtenerVentasPorCliente(c.id_cliente);
      setMisVentas(ventas);
    };
    cargarDatos();
  }, [user]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) setImagen(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validarCampos = () => {
    const nuevoErrores: Record<string, string> = {};
    let valido = true;

    if (!nombre.trim()) { nuevoErrores.nombre = "Nombre obligatorio"; valido = false; }
    if (!apellido.trim()) { nuevoErrores.apellido = "Apellido obligatorio"; valido = false; }
    if (!correo.trim()) { nuevoErrores.correo = "Correo obligatorio"; valido = false; }
    else if (!/\S+@\S+\.\S+/.test(correo)) { nuevoErrores.correo = "Formato de correo inválido"; valido = false; }
    if (!direccion.trim()) { nuevoErrores.direccion = "Dirección obligatoria"; valido = false; }
    if (!fechaNac.trim()) { nuevoErrores.fechaNac = "Fecha de nacimiento obligatoria"; valido = false; }

    setErrores(nuevoErrores);
    return valido;
  };

  const handleGuardar = async () => {
    if (!cliente) return;
    if (!validarCampos()) return;

    const clienteActualizado: Cliente = {
      ...cliente,
      nombre_cliente: nombre,
      apellido_cliente: apellido,
      correo_cliente: correo,
      telefono,
      direccion,
      fecha_nac_cliente: fechaNac,
      imagen_cliente: imagen,
    };

    await clientesService.actualizarCliente(clienteActualizado);
    setCliente(clienteActualizado);
    setMostrarModal(false);
  };

  return {
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
    setImagen,
    errores,
    handleImagenChange,
    handleGuardar,
  };
}
