import { renderHook, act } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { useBlog } from "../hooks/useBlog";
import { UserProvider } from "../context/UserContext";
import { ROLES } from "../context/UserRoles";
import { EventCard } from "../components/EventCard";
import { Carrusel } from "../components/Carrusel";


// PRUEBAS DE HOOKS : useBlog

describe("Cliente - useBlog hooks", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserProvider>{children}</UserProvider>
  );

  test("abre una noticia y vuelve a la lista", () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.abrirNoticia(result.current.noticias[0]);
    });

    expect(result.current.vistaNoticia).toBe(result.current.noticias[0]);

    act(() => {
      result.current.volver();
    });

    expect(result.current.vistaNoticia).toBeNull();
  });

  test("no agrega comentario si el rol no es CLIENTE", () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.user = { nombre: "Admin", correo: "admin@test.com", rol: ROLES.ADMIN };
    });

    act(() => {
      result.current.abrirNoticia(result.current.noticias[0]);
    });

    act(() => {
      result.current.setNuevoComentario("Comentario que no debería agregarse");
    });

    act(() => {
      result.current.agregarComentario();
    });

    const comentarios = result.current.comentarios;
    expect(comentarios.find(c => c.texto === "Comentario que no debería agregarse")).toBeUndefined();
    expect(result.current.nuevoComentario).toBe("Comentario que no debería agregarse");
  });

  test("carga correctamente los comentarios al abrir una noticia", () => {
    const { result } = renderHook(() => useBlog(), { wrapper });

    act(() => {
      result.current.abrirNoticia(result.current.noticias[0]);
    });

    expect(result.current.comentarios).toEqual(result.current.noticias[0].comentarios);
  });
});


// PRUEBAS DE COMPONENTE: EventCard

describe("Pruebas de componente: EventCard", () => {
  const eventoMock = {
    nombre: "Festival Gamer 2025",
    fecha: "12/11/2025",
    lugar: "Santiago Centro",
    descripcion: "Un evento con torneos, charlas y concursos."
  };

  test("renderiza el nombre del evento", () => {
    render(<EventCard evento={eventoMock} />);
    expect(screen.getByText("Festival Gamer 2025")).toBeInTheDocument();
  });

  test("muestra correctamente la fecha del evento", () => {
    render(<EventCard evento={eventoMock} />);
    expect(screen.getByText(/12\/11\/2025/)).toBeInTheDocument();
  });

  test("muestra correctamente el lugar", () => {
    render(<EventCard evento={eventoMock} />);
    expect(screen.getByText("Santiago Centro")).toBeInTheDocument();
  });

  test("muestra la descripción del evento", () => {
    render(<EventCard evento={eventoMock} />);
    expect(screen.getByText("Un evento con torneos, charlas y concursos.")).toBeInTheDocument();
  });
});


// PRUEBA SNAPSHOT: Carrusel

describe("Snapshot - Carrusel", () => {
  test("renderiza el carrusel correctamente (snapshot)", () => {
    const imagenesMock = [
      { url: "https://example.com/imagen1.jpg", alt: "Imagen 1" },
      { url: "https://example.com/imagen2.jpg", alt: "Imagen 2" }
    ];

    
    const { container } = render(
      <Carrusel id="test-carrusel" imagenes={imagenesMock} altura="200px" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
