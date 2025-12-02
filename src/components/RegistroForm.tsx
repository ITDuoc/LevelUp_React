import React, { type FormEvent } from "react";

interface Props {
  nombre: string;
  setNombre: (v: string) => void;
  apellido: string;
  setApellido: (v: string) => void;
  correo: string;
  setCorreo: (v: string) => void;
  contrasenia: string;
  setContrasenia: (v: string) => void;
  fechaNac: string;
  setFechaNac: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: () => Promise<void>;
}

export default function RegistroForm(props: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="cardSimple p-4 shadow">
      {props.error && <p className="text-danger">{props.error}</p>}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={props.nombre}
            onChange={(e) => props.setNombre(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            value={props.apellido}
            onChange={(e) => props.setApellido(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          value={props.correo}
          onChange={(e) => props.setCorreo(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={props.contrasenia}
          onChange={(e) => props.setContrasenia(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input
          type="date"
          className="form-control"
          value={props.fechaNac}
          onChange={(e) => props.setFechaNac(e.target.value)}
        />
        <small className="form-text text-muted">
          Si no seleccionas fecha, se asignará: 1995-01-01
        </small>
      </div>

      <button type="submit" className="btn btn-primary" disabled={props.loading}>
        {props.loading ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
}
