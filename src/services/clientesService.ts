import type { Cliente } from "./interfaces";
import { clientes as clientesSimulados } from "./DatosSimulados";

// Obtener cliente por correo
export const obtenerClientePorCorreo = async (correo: string): Promise<Cliente | undefined> => {
  return clientesSimulados.find(c => c.correo_cliente === correo);
};

// Actualizar datos de cliente
export const actualizarCliente = async (clienteActualizado: Cliente): Promise<void> => {
  const index = clientesSimulados.findIndex(c => c.id_cliente === clienteActualizado.id_cliente);
  if (index !== -1) {
    clientesSimulados[index] = clienteActualizado;
  }
};
