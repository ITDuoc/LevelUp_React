import React from "react";
import { Carrusel } from "./Carrusel";
import type { Producto } from "../services/interfaces";

type Props = {
  productos: Producto[];
};

export function HighlightCarousel({ productos }: Props) {
  return (
    <div className="mb-5">
      <h2 className="mb-4 text-center">Productos Destacados</h2>

      <Carrusel
        imagenes={productos.map((p) => ({
          url: p.imagen_producto,
          alt: p.nombre_producto,
        }))}
      />
    </div>
  );
}
