import React from "react";
import { useInicioData } from "../hooks/useInicioData";
import { HighlightCarousel } from "../components/HighlightCarousel";
import { CategoriaCard } from "../components/CategoriaCard";
import { EventCard } from "../components/EventCard";
import { EventMap } from "../components/EventMap";

export default function Inicio() {
  const { productosDestacados, categoriasData, evento } = useInicioData();

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="hero d-flex flex-column justify-content-center align-items-center text-center">
        <div className="hero-overlay"></div>

        <div className="hero-content position-relative text-white fade-in">
          <h1 className="display-5 fw-bold mb-3">¡Bienvenido a LevelUp Gamer!</h1>
          <p className="lead mb-4">
            Sube de nivel tu experiencia gamer con nuestros productos y eventos exclusivos.
          </p>

          <button className="btn btn-primary btn-lg" onClick={() => handleScroll("productos")}>
            Explorar Tienda
          </button>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="container" id="productos" style={{ marginTop: "3rem" }}>

        <HighlightCarousel productos={productosDestacados} />

        <h3 className="mb-3 text-center">Categorías</h3>
        <div className="row mb-5">
          {categoriasData.map((cat) => (
            <CategoriaCard key={cat.id_categoria} categoria={cat} />
          ))}
        </div>

        {evento && (
          <>
            <h3 className="mb-3 text-center">Próximo Evento Gamer</h3>

            <div className="row mb-5">
              <div className="col-md-7 mb-3">
                <EventMap evento={evento} />
              </div>

              <div className="col-md-5">
                <EventCard evento={evento} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
