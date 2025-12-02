import React from "react";

export function EventMap({ evento }: { evento: any }) {
  return (
    <iframe
      className="event-map"
      src={evento.mapaEmbed}
      width="100%"
      height="400"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title={evento.nombre}
    ></iframe>
  );
}
