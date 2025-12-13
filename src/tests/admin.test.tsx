import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { useDashboard } from "../hooks/useDashboard";
import { ROLES } from "../context/UserRoles";


   //MOCK USER CONTEXT

vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: {
      idUsuario: 1,
      nombre: "Admin Test",
      correoUsuario: "admin@test.com",
      rol: ROLES.ADMIN,
    },
  }),
}));

describe("Admin - useDashboard hook", () => {

  test("calcula correctamente el total de ventas", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.totalVentas).toBe(820000);
    });
  });

  test("calcula correctamente el total de productos vendidos", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.totalProductosVendidos).toBe(23);
    });
  });

  test("determina correctamente la categoría más vendida", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(result.current.categoriaMasVendida).toBe("Juegos de Mesa");
    });
  });
});
