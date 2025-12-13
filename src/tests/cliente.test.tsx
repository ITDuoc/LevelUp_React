import { renderHook, waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { useBlog } from "../hooks/useBlog";
import { ROLES } from "../context/UserRoles";
import { EventCard } from "../components/EventCard";
import { Carrusel } from "../components/Carrusel";

/* =======================
   MOCK USER CONTEXT
======================= */
vi.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: {
      rol: ROLES.CLIENTE,
    },
  }),
}));

/* =======================
   TEST HOOK useBlog
======================= */
describe("Cliente - useBlog hook (API actual)", () => {

  test("carga noticias correctamente", async () => {
    const { result } = renderHook(() => useBlog());

    await waitFor(() => {
      expect(result.current.noticias.length).toBeGreaterThan(0);
    });
  });

  test("obtiene comentarios por noticia", async () => {
    const { result } = renderHook(() => useBlog());

    await waitFor(() => {
      expect(result.current.noticias.length).toBeGreaterThan(0);
    });

    const noticia = result.current.noticias[0];
    const comentarios = result.current.comentariosPorNoticia(noticia.id);

    expect(Array.isArray(comentarios)).toBe(true);
  });

});

/* =======================
   COMPONENTS
======================= */
describe("EventCard", () => {
  const eventoMock = {
    nombre: "Festival Gamer 2025",
    fecha: "12/11/2025",
    lugar: "Santiago Centro",
    descripcion: "Un evento con torneos, charlas y concursos.",
  };

  test("renderiza el evento correctamente", () => {
    render(<EventCard evento={eventoMock} />);
    expect(screen.getByText("Festival Gamer 2025")).toBeInTheDocument();
    expect(screen.getByText("Santiago Centro")).toBeInTheDocument();
  });
});

describe("Snapshot - Carrusel", () => {
  test("renderiza el carrusel correctamente", () => {
    const imagenesMock = [
      { url: "https://example.com/imagen1.jpg", alt: "Imagen 1" },
      { url: "https://example.com/imagen2.jpg", alt: "Imagen 2" },
    ];

    const { container } = render(
      <Carrusel id="test" imagenes={imagenesMock} altura="200px" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
