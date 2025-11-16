import React, { useEffect } from "react";

interface ToastProps {
  mensaje: string | null;
  onClose: () => void;
  duracion?: number; // opcional, default 3000ms
}

export default function Toast({ mensaje, onClose, duracion = 3000 }: ToastProps) {
  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(onClose, duracion);
    return () => clearTimeout(timer);
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div
      className="toast show toast-custom position-fixed bottom-0 end-0 m-3"
      role="alert"
      style={{ zIndex: 9999 }}
    >
      <div className="toast-header">
        <strong className="me-auto">Notificación</strong>
        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
      </div>
      <div className="toast-body">{mensaje}</div>
    </div>
  );
}
