import { renderHook } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { useDashboard } from "../hooks/useDashboard";



// MOCK Canvas

const mockCtx = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  arc: vi.fn(),
  closePath: vi.fn(),
  fill: vi.fn(),
  fillText: vi.fn(),
  fillRect: vi.fn(),                
  textAlign: "center" as CanvasTextAlign,
  textBaseline: "middle" as CanvasTextBaseline,
  fillStyle: "" as string,        
} as unknown as CanvasRenderingContext2D;


HTMLCanvasElement.prototype.getContext = vi.fn(
  (type: string) => (type === "2d" ? mockCtx : null)
) as any;



// MOCK de datos

const mockData = {
  ventas: [
    {
      id_venta: 1,
      fecha_venta: "2024-01-10",
      total_venta: 50000,
      id_cliente: 1,
      id_metodo_pago: 1,
      id_estado_venta: 1,
      direccion_envio: "Calle 123",
      id_comuna: 1,
      id_vendedor: 1,
    },
    {
      id_venta: 2,
      fecha_venta: "2024-01-11",
      total_venta: 30000,
      id_cliente: 2,
      id_metodo_pago: 1,
      id_estado_venta: 1,
      direccion_envio: "Av Libertad 456",
      id_comuna: 1,
      id_vendedor: 1,
    },
  ],

  detalleVentas: [
    {
      id_detalle: 1,
      id_venta: 1,
      id_producto: 1,
      cantidad: 2,
      precio: 20000,
      subtotal: 40000,
      total: 40000,
      descuento: 0,
    },
    {
      id_detalle: 2,
      id_venta: 2,
      id_producto: 2,
      cantidad: 1,
      precio: 30000,
      subtotal: 30000,
      total: 30000,
      descuento: 0,
    },
  ],

  productos: [
    {
      id_producto: 1,
      nombre_producto: "Mouse Gamer",
      precio: 20000,
      stock: 10,
      estado_producto: true,
      id_categoria: 1,
      id_marca: 1,
      imagen_producto: "mouse.png",
      descripcion_producto: "Mouse RGB",
    },
    {
      id_producto: 2,
      nombre_producto: "Teclado Mecánico",
      precio: 30000,
      stock: 5,
      estado_producto: true,
      id_categoria: 2,
      id_marca: 1,
      imagen_producto: "teclado.png",
      descripcion_producto: "Switch Blue",
    },
  ],

  clientes: [
    {
      id_cliente: 1,
      nombre_cliente: "Juan",
      apellido_cliente: "Pérez",
      correo_cliente: "juan@example.com",
      contrasenia_cliente: "1234",
      telefono: "123456789",
      direccion: "Calle 123",
      id_comuna: 1,
      fecha_nac_cliente: "1990-01-01",
      imagen_cliente: "",
    },
    {
      id_cliente: 2,
      nombre_cliente: "Ana",
      apellido_cliente: "Gómez",
      correo_cliente: "ana@example.com",
      contrasenia_cliente: "abcd",
      direccion: "Av Libertad",
      id_comuna: 1,
      fecha_nac_cliente: "1995-01-01",
    },
  ],

  categorias: [
    {
      id_categoria: 1,
      nombre_categoria: "Accesorios",
      descripcion_categoria: "Accesorios gamer",
      estado_categoria: true,
      imagen_categoria: "acc.png",
    },
    {
      id_categoria: 2,
      nombre_categoria: "Teclados",
      descripcion_categoria: "Teclados mecánicos",
      estado_categoria: true,
      imagen_categoria: "tec.png",
    },
  ],
};


vi.mock("../services/dashboardService", () => ({
  obtenerDashboardData: vi.fn(() => mockData),
}));



// TESTS DATOS: useDashboard

describe("Admin - useDashboard hook", () => {
  test("calcula correctamente el total de ventas", () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.totalVentas).toBe(80000);
  });

  test("calcula correctamente el total de productos vendidos", () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.totalProductosVendidos).toBe(3);
  });

  test("determina correctamente la categoría más vendida", () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.categoriaMasVendida).toBe("Accesorios");
  });
});



// TEST COMPONENTE: PieChart

test("PieChart se renderiza y dibuja usando el contexto", () => {
  const data = [
    { nombre: "A", vendidos: 3, color: "#FF0000" },
    { nombre: "B", vendidos: 1, color: "#00FF00" },
  ];

  const spy = vi.spyOn(HTMLCanvasElement.prototype, "getContext");

  render(<PieChart data={data} />);

  expect(spy).toHaveBeenCalledWith("2d");

  const ctx = spy.mock.results[0].value;

  expect(ctx.fill).toHaveBeenCalled();
});



// TEST COMPONENTE: BarChart (snapshot)

test("BarChart snapshot", () => {
  const tree = render(
    <BarChart data={[10, 20, 30]} labels={["A", "B", "C"]} />
  );

  expect(tree.container.firstChild).toMatchSnapshot();
});
