import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

// Importamos los roles seguros
import { ROLES } from "../context/UserRoles";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { totalCantidad } = useCart();

  const handleCerrarSesion = () => {
    logout();
    navigate("/");
  };

  // Rol validado correctamente
  const esAdmin = user?.rol === ROLES.ADMIN;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          LevelUp Gamer
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          
          {/* Navegación principal */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!esAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Inicio
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Productos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/blog">
                    Blog
                  </Link>
                </li>
              </>
            )}

            {esAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/paneladmin">
                  Panel de Administrador
                </Link>
              </li>
            )}
          </ul>

          {/* Carrito + Cuenta */}
          <ul className="navbar-nav ms-auto align-items-center">

            {!esAdmin && (
              <li className="nav-item me-3 position-relative">
                <button
                  className="btn btn-outline-light position-relative"
                  onClick={() => navigate("/carrito")}
                >
                  <i className="bi bi-cart-fill"></i>

                  {totalCantidad > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalCantidad}
                    </span>
                  )}
                </button>
              </li>
            )}

            {/* Dropdown Cuenta */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle"
                id="dropdownCuenta"
                data-bs-toggle="dropdown"
              >
                Cuenta
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownCuenta"
              >
                {!user && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Iniciar sesión
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/registro">
                        Crear cuenta
                      </Link>
                    </li>
                  </>
                )}

                {user && !esAdmin && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/cuenta">
                        Mi perfil
                      </Link>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleCerrarSesion}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                )}

                {user && esAdmin && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleCerrarSesion}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
