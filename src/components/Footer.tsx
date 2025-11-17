import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <p className="mb-1">
          <strong>Level Up Gamer</strong> © {year} - Todos los derechos reservados.
        </p>

        <p>
          <i className="bi bi-envelope"></i> contacto@levelupgamer.com |{" "}
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="text-success ms-2"
          >
            <i className="bi bi-whatsapp"></i> WhatsApp
          </a>
        </p>

        <div>
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-instagram mx-2"></i>
          <i className="bi bi-twitter-x mx-2"></i>
        </div>
      </div>
    </footer>
  );
}
