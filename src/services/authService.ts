import type { User } from "../context/UserContext";
import { clientes, vendedores, administradores } from "./DatosSimulados";

export const loginSimulado = async (correo: string, contrasenia: string): Promise<User | null> => {
  const correoLower = correo.trim().toLowerCase();

  // Buscar cliente
  const cliente = clientes.find(
    c => c.correo_cliente.toLowerCase() === correoLower && c.contrasenia_cliente === contrasenia
  );
  if (cliente) return { nombre: `${cliente.nombre_cliente} ${cliente.apellido_cliente}`, correo: cliente.correo_cliente, rol: "cliente" };

  // Buscar vendedor
  const vendedor = vendedores.find(
    v => v.correo_vendedor.toLowerCase() === correoLower && v.contrasenia_vendedor === contrasenia
  );
  if (vendedor) return { nombre: `${vendedor.nombre_vendedor} ${vendedor.apellido_vendedor}`, correo: vendedor.correo_vendedor, rol: "vendedor" };

  // Buscar administrador
  const admin = administradores.find(
    a => a.correo_administrador.toLowerCase() === correoLower && a.contrasenia_administrador === contrasenia
  );
  if (admin) return { nombre: `${admin.nombre_administrador} ${admin.apellido_administrador}`, correo: admin.correo_administrador, rol: "administrador" };

  return null;
};
