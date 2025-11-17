import React from "react";

interface Props {
  mostrar: boolean;
  onCerrar: () => void;
  nombre: string;
  setNombre: (v: string) => void;
  apellido: string;
  setApellido: (v: string) => void;
  correo: string;
  setCorreo: (v: string) => void;
  telefono: string;
  setTelefono: (v: string) => void;
  direccion: string;
  setDireccion: (v: string) => void;
  fechaNac: string;
  setFechaNac: (v: string) => void;
  imagen: string;
  handleImagenChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errores: Record<string,string>;
  onGuardar: () => void;
}

export default function EditarPerfilModal(props: Props) {
  if (!props.mostrar) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cardSimple p-3">
          <h5 className="mb-3 text-center">Editar Perfil</h5>

          <form onSubmit={e => { e.preventDefault(); props.onGuardar(); }}>
            <div className="text-center mb-3">
              <img
                src={props.imagen || "/images/default-user.png"}
                alt="Foto de perfil"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: "0.5rem" }}
              />
              <input type="file" accept="image/*" className="form-control mt-2" onChange={props.handleImagenChange} />
            </div>

            {/** Campos de texto */}
            {[
              { label: "Nombre", value: props.nombre, setValue: props.setNombre, error: props.errores.nombre },
              { label: "Apellido", value: props.apellido, setValue: props.setApellido, error: props.errores.apellido },
              { label: "Correo", value: props.correo, setValue: props.setCorreo, error: props.errores.correo },
              { label: "Teléfono", value: props.telefono, setValue: props.setTelefono },
              { label: "Dirección", value: props.direccion, setValue: props.setDireccion, error: props.errores.direccion },
              { label: "Fecha de Nacimiento", value: props.fechaNac, setValue: props.setFechaNac, error: props.errores.fechaNac, type: "date" }
            ].map(({ label, value, setValue, error, type }) => (
              <div className="mb-2" key={label}>
                <label>{label}</label>
                <input
                  type={type || "text"}
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
            ))}

            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="btn btn-secondary me-2" onClick={props.onCerrar}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
