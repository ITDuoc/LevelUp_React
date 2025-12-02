import React from "react";
import { useAdminVentas } from "../hooks/useAdminVentas";
import VentaModal from "../components/VentaModal";

export default function AdminVentas() {
  const {
    ventas,
    estados,
    showModal,
    ventaSeleccionada,
    setShowModal,
    handleVerDetalle,
  } = useAdminVentas();

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Ventas</h2>

      <div className="cardSimple p-3">
        <div className="table-responsive">
          <table className="table table-dark table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{new Date(v.fechaVenta).toLocaleDateString()}</td>
                  <td>${v.totalVenta}</td>
                  <td>{estados.find(e => e.id === v.idEstadoVenta)?.nombre ?? "Pendiente"}</td>
                  <td>
                    {/* Botón Ver detalle con mismo estilo que Guardar */}
                    <button className="btn btn-primary btn-sm" onClick={() => handleVerDetalle(v)}>
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VentaModal
        show={showModal}
        onClose={() => setShowModal(false)}
        venta={ventaSeleccionada}
        estados={estados}
      />
    </div>
  );
}
