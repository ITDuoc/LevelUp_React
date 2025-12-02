import { MetodoPago } from "../interfaces/MetodoPago";

const URL = "http://localhost:8083/metodos-pago";

export const metodoPagoService = {
  listar: async (): Promise<MetodoPago[]> => {
    const res = await fetch(URL);
    return res.json();
  },

  obtener: async (id: number): Promise<MetodoPago> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
  },

  crear: async (mp: MetodoPago): Promise<MetodoPago> => {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mp),
    });
    return res.json();
  },

  actualizar: async (id: number, mp: MetodoPago): Promise<MetodoPago> => {
    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mp),
    });
    return res.json();
  },

  eliminar: async (id: number): Promise<void> => {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
  },
};
