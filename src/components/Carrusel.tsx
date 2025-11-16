import React from "react";

export type CarruselImagen = {
  url: string;
  alt?: string;
};

type Props = {
  id?: string;
  imagenes: CarruselImagen[];
  altura?: string; // opcional para definir altura del carrusel
};

export const Carrusel: React.FC<Props> = ({ id, imagenes, altura = "33vh" }) => {
  const carruselId = id || "carrusel-" + Math.random().toString(36).substring(2);

  return (
    <div
      id={carruselId}
      className="carousel slide"
      data-bs-ride="carousel"
      aria-label="Carrusel de imágenes"
      style={{ maxHeight: altura, overflow: "hidden" }}
    >
      <div className="carousel-inner">
        {imagenes.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={img.url}
              className="d-block w-100"
              alt={img.alt || `slide-${index + 1}`}
              style={{ height: altura, objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carruselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carruselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};
