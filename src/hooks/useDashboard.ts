// src/hooks/useDashboard.ts
import { useState, useEffect, useMemo } from "react";
import type { Categoria } from "../interfaces/Producto";

interface VentaDetalle {
  idProducto: number | null;
  cantidad: number;
  subtotal: number;
}

interface Venta {
  id: number;
  fechaVenta: string;
  totalVenta: number;
  detalles: VentaDetalle[];
}

interface Cliente {
  idUsuario: number;
}

interface CategoriaVentas {
  nombre: string;
  vendidos: number;
  color: string;
}

export function useDashboard() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [ventasRes, productosRes, clientesRes, categoriasRes] = await Promise.all([
          fetch("http://localhost:8083/ventas").then(r => r.json()),
          fetch("http://localhost:8081/producto").then(r => r.json()),
          fetch("http://localhost:8082/usuario").then(r => r.json()),
          fetch("http://localhost:8081/categorias").then(r => r.json()),
        ]);

        setVentas(ventasRes);
        setProductos(productosRes);
        setClientes(clientesRes);
        setCategorias(categoriasRes);
      } catch (err) {
        console.error("Error cargando datos del dashboard:", err);
      }
    };
    cargarDatos();
  }, []);

  const totalVentas = useMemo(
    () => ventas.reduce((acc, v) => acc + Number(v.totalVenta || 0), 0),
    [ventas]
  );

  const totalProductosVendidos = useMemo(
    () => ventas.reduce((acc, v) => acc + v.detalles.reduce((a, d) => a + d.cantidad, 0), 0),
    [ventas]
  );

  const totalClientes = clientes.length;

  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const ventasMensuales = useMemo(() => {
    const arr = Array(12).fill(0);
    ventas.forEach(v => {
      const mes = new Date(v.fechaVenta).getMonth();
      arr[mes] += Number(v.totalVenta || 0);
    });
    return arr;
  }, [ventas]);

  const maxVentas = Math.max(...ventasMensuales);
  const mesMayorVentasIndex = ventasMensuales.indexOf(maxVentas);
  const mesMayorVentas = meses[mesMayorVentasIndex];

  const ventasDelMes = ventas.filter(v => new Date(v.fechaVenta).getMonth() === mesMayorVentasIndex);
  const totalArticulosMes = ventasDelMes.reduce(
    (acc, v) => acc + v.detalles.reduce((a, d) => a + d.cantidad, 0),
    0
  );

  // Categoría más vendida del mes
  const categoriaContador: Record<number, number> = {};
  ventasDelMes.forEach(v => {
    v.detalles.forEach(d => {
      if (d.idProducto == null) return;
      const producto = productos.find(p => p.idProducto === d.idProducto);
      if (producto && producto.categoria?.idCategoria != null) {
        const catId = producto.categoria.idCategoria;
        categoriaContador[catId] = (categoriaContador[catId] || 0) + d.cantidad;
      }
    });
  });

  const idCatMasVendida = Object.entries(categoriaContador).reduce(
    (prev, [catId, cant]) => (cant > prev.cant ? { id: Number(catId), cant } : prev),
    { id: 0, cant: 0 }
  ).id;

  const categoriaMasVendida = categorias.find(c => c.idCategoria === idCatMasVendida)?.nomCategoria ?? "-";

  // Datos para pie chart
  const colores = ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"];
  const categoriasVendidas: CategoriaVentas[] = categorias.map((cat, i) => {
    const catProductos = productos
      .filter(p => p.categoria?.idCategoria === cat.idCategoria)
      .map(p => p.idProducto);

    const vendidos = ventas.reduce(
      (acc, v) =>
        acc +
        v.detalles
          .filter(d => d.idProducto != null && catProductos.includes(d.idProducto))
          .reduce((a, d) => a + d.cantidad, 0),
      0
    );

    return { nombre: cat.nomCategoria, vendidos, color: colores[i % colores.length] };
  }).sort((a, b) => b.vendidos - a.vendidos);

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
