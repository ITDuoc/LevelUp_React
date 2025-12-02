import { useState, useEffect } from "react";

export interface Region {
  id: number;
  nombre: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  region: Region;
}

export interface Comuna {
  id: number;
  nombre: string;
  ciudad: Ciudad;
}

const API_URL = "http://localhost:8084";

export function useZona() {
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [regionSeleccionada, setRegionSeleccionada] = useState<number | null>(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    async function cargarTodo() {
      try {
        setLoading(true);
        // fetch regiones
        const respRegiones = await fetch(`${API_URL}/regiones`);
        const dataRegiones: Region[] = await respRegiones.json();
        setRegiones(dataRegiones);

        // fetch ciudades
        const respCiudades = await fetch(`${API_URL}/ciudades`);
        const dataCiudades: Ciudad[] = await respCiudades.json();
        setCiudades(dataCiudades);

        // fetch comunas
        const respComunas = await fetch(`${API_URL}/comunas`);
        const dataComunas: Comuna[] = await respComunas.json();
        setComunas(dataComunas);

      } catch (err) {
        console.error(err);
        setError("Error al cargar datos de zona");
      } finally {
        setLoading(false);
      }
    }

    cargarTodo();
  }, []);

  
  const ciudadesFiltradas = regionSeleccionada
    ? ciudades.filter(c => c.region.id === regionSeleccionada)
    : ciudades;

  const comunasFiltradas = ciudadSeleccionada
    ? comunas.filter(c => c.ciudad.id === ciudadSeleccionada)
    : comunas;

  return {
    regiones,
    ciudades,
    comunas,
    ciudadesFiltradas,
    comunasFiltradas,
    loading,
    error,
    regionSeleccionada,
    setRegionSeleccionada,
    ciudadSeleccionada,
    setCiudadSeleccionada,
  };
}
