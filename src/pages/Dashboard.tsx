import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import DashboardCard from "../components/DashboardCard";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import CategoryLegend from "../components/CategoryLegend";

export default function Dashboard() {
  const {
    totalVentas,
    totalProductosVendidos,
    totalClientes,
    ventasMensuales,
    meses,
    maxVentas,
    mesMayorVentas,
    totalArticulosMes,
    categoriaMasVendida,
    categoriasVendidas
  } = useDashboard();

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="d-flex gap-3 mb-4">
        <DashboardCard title="Total Ventas" value={`$${totalVentas}`} />
        <DashboardCard title="Productos Vendidos" value={totalProductosVendidos} />
        <DashboardCard title="Clientes Registrados" value={totalClientes} />
      </div>

      <div className="d-flex gap-3 mb-3">
        <div className="cardSimple p-3 flex-fill">
          <h4>Ventas Mensuales</h4>
          <BarChart data={ventasMensuales} labels={meses} />
          <div className="cardSimple p-3 mt-3">
            <strong>Mes con más ventas:</strong> {mesMayorVentas} <br />
            <strong>Monto total:</strong> ${maxVentas} <br />
            <strong>Total artículos vendidos:</strong> {totalArticulosMes} <br />
            <strong>Categoría más vendida:</strong> {categoriaMasVendida}
          </div>
        </div>

        <div className="cardSimple p-3 flex-fill">
          <h4>Ventas por Categoría</h4>
          <PieChart data={categoriasVendidas} />
          <CategoryLegend data={categoriasVendidas} />
        </div>
      </div>
    </div>
  );
}
