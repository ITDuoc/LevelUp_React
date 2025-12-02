import React from "react";

interface Props {
  correo: string;
  setCorreo: (v: string) => void;
  contrasenia: string;
  setContrasenia: (v: string) => void;
  error: string | null;
  cargando: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({ correo, setCorreo, contrasenia, setContrasenia, error, cargando, onSubmit }: Props) {
  return (
    <div className="d-flex" style={{ minHeight: "calc(100vh - 60px - 60px)" }}>
      <div
        className="d-none d-md-block"
        style={{
          flex: "0 0 40%",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('/images/banner/usuarios01.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex-fill d-flex justify-content-center align-items-center">
        <div className="cardSimple shadow p-4" style={{ maxWidth: "400px", width: "100%", marginLeft: "2rem" }}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={contrasenia}
                onChange={e => setContrasenia(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={cargando}>
              {cargando ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
