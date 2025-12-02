import React from "react";

export function EventCard({ evento }: { evento: any }) {
  return (
    <div className="cardSimple h-100">
      <div className="card-body">
        <h5 className="card-title text-violeta">{evento.nombre}</h5>
        <p className="card-text"><strong>Fecha:</strong> {evento.fecha}</p>
        <p className="card-text"><strong>Lugar:</strong> {evento.lugar}</p>
        <p className="card-text">{evento.descripcion}</p>
      </div>
    </div>
  );
}
