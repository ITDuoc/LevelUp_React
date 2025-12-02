import { useMemo } from "react";
import { obtenerDashboardData } from "../services/dashboardService";
import type { CategoriaVentas } from "../services/dashboardService";

export function useDashboard() {
  const { ventas, detalleVentas, productos, clientes, categorias } = obtenerDashboardData();

  // Cards resumen
  const totalVentas = useMemo(() => ventas.reduce((acc, v) => acc + v.total_venta, 0), [ventas]);
  const totalProductosVendidos = useMemo(() => detalleVentas.reduce((acc, d) => acc + d.cantidad, 0), [detalleVentas]);
  const totalClientes = clientes.length;

  // Ventas mensuales
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const ventasMensuales = useMemo(() => {
    const arr = Array(12).fill(0);
    ventas.forEach(v => {
      const mes = new Date(v.fecha_venta).getMonth();
      arr[mes] += v.total_venta;
    });
    return arr;
  }, [ventas]);

  const maxVentas = Math.max(...ventasMensuales);
  const mesMayorVentasIndex = ventasMensuales.indexOf(maxVentas);
  const mesMayorVentas = meses[mesMayorVentasIndex];

  const ventasDelMes = detalleVentas.filter(d => {
    const venta = ventas.find(v => v.id_venta === d.id_venta);
    return venta ? new Date(venta.fecha_venta).getMonth() === mesMayorVentasIndex : false;
  });

  const totalArticulosMes = ventasDelMes.reduce((acc, d) => acc + d.cantidad, 0);

  const categoriaMasVendidaIndex = ventasDelMes.reduce((acc, d) => {
    const producto = productos.find(p => p.id_producto === d.id_producto);
    if (!producto) return acc;
    const catId = producto.id_categoria;
    acc[catId] = (acc[catId] || 0) + d.cantidad;
    return acc;
  }, {} as Record<number, number>);

  const idCatMasVendida = Object.entries(categoriaMasVendidaIndex).reduce(
    (prev, [catIdStr, cantidad]) => cantidad > prev.cant ? { id: parseInt(catIdStr), cant: cantidad } : prev,
    { id: 0, cant: 0 }
  ).id;

  const categoriaMasVendida = categorias.find(c => c.id_categoria === idCatMasVendida)?.nombre_categoria ?? "-";

  // Categorias vendidas para pie chart
  const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"];
  const categoriasVendidas: CategoriaVentas[] = categorias.map((cat, i) => {
    const catProductos = productos.filter(p => p.id_categoria === cat.id_categoria).map(p => p.id_producto);
    const vendidos = detalleVentas.filter(d => catProductos.includes(d.id_producto)).reduce((acc,d) => acc + d.cantidad, 0);
    return { nombre: cat.nombre_categoria, vendidos, color: colores[i % colores.length] };
  }).sort((a,b) => b.vendidos - a.vendidos);

  return {
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
  };
}
