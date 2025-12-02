import { EstadoVenta } from "../interfaces/EstadoVenta";

const URL = "http://localhost:8083/estados-venta";

export const estadoVentaService = {
  listar: async (): Promise<EstadoVenta[]> => {
    const res = await fetch(URL);
    return res.json();
  },

  obtener: async (id: number): Promise<EstadoVenta> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  },

  crear: async (ev: EstadoVenta): Promise<EstadoVenta> => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ev),
    });
    return res.json();
  },

  actualizar: async (id: number, ev: EstadoVenta): Promise<EstadoVenta> => {
    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ev),
    });
    return res.json();
  },

  eliminar: async (id: number): Promise<void> => {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
  },
};
