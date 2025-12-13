import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { useDashboard } from "../hooks/useDashboard";
import { ROLES } from "../context/UserRoles";

/* =======================
   MOCK USER CONTEXT
======================= */
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

/* =======================
   TEST HOOK useDashboard
======================= */
describe("Admin - useDashboard hook", () => {

  test("calcula el total de ventas (valor numérico válido)", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(typeof result.current.totalVentas).toBe("number");
      expect(result.current.totalVentas).toBeGreaterThanOrEqual(0);
    });
  });

  test("calcula el total de productos vendidos", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(typeof result.current.totalProductosVendidos).toBe("number");
      expect(result.current.totalProductosVendidos).toBeGreaterThanOrEqual(0);
    });
  });

  test("determina una categoría más vendida válida", async () => {
    const { result } = renderHook(() => useDashboard());

    await waitFor(() => {
      expect(
        result.current.categoriaMasVendida === null ||
        typeof result.current.categoriaMasVendida === "string"
      ).toBe(true);
    });
  });

});
