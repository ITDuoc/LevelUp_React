import { useState } from "react";

export type Seccion = "dashboard" | "usuarios" | "productos";

export function useSeccion(initial: Seccion = "dashboard") {
  const [seccionActiva, setSeccionActiva] = useState<Seccion>(initial);

  const cambiarSeccion = (seccion: Seccion) => setSeccionActiva(seccion);

  return { seccionActiva, cambiarSeccion };
}
