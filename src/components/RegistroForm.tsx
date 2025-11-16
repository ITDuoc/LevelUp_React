import React, { type FormEvent } from "react";
import type { UserRole } from "../context/UserRoles";

interface Props {
  nombre: string;
  setNombre: (v: string) => void;
  apellido: string;
  setApellido: (v: string) => void;
  correo: string;
  setCorreo: (v: string) => void;
  contrasenia: string;
  setContrasenia: (v: string) => void;
  telefono: string;
  setTelefono: (v: string) => void;
  direccion: string;
  setDireccion: (v: string) => void;
  idComuna: string;
  setIdComuna: (v: string) => void;
  fechaNac: string;
  setFechaNac: (v: string) => void;
  rol: UserRole;
  setRol: (v: UserRole) => void;
  loading: boolean;
  error: string | null;
  onSubmit: () => Promise<void>; // obligatorio
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
        <label className="form-label">Teléfono</label>
        <input
          type="tel"
          className="form-control"
          value={props.telefono}
          onChange={(e) => props.setTelefono(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          value={props.direccion}
          onChange={(e) => props.setDireccion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ID Comuna</label>
        <input
          type="number"
          className="form-control"
          value={props.idComuna}
          onChange={(e) => props.setIdComuna(e.target.value)}
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
      </div>

      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select
          className="form-select"
          value={props.rol as string}
          onChange={(e) => props.setRol(e.target.value as UserRole)}
        >
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
          <option value="vendedor">Vendedor</option>
        </select>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary" disabled={props.loading}>
          {props.loading ? "Creando..." : "Crear cuenta"}
        </button>
      </div>
    </form>
  );
}
