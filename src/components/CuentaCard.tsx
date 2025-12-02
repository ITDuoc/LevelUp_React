import React, { useEffect, useState } from "react";
import type { UsuarioBackend } from "../interfaces/UsuarioBackend";

interface Props {
  user: { idUsuario: number; correo: string; rol: string };
  onEditar?: () => void;
}

export default function CuentaCard({ user, onEditar }: Props) {
  const [perfil, setPerfil] = useState<UsuarioBackend | null>(null);
  const [loading, setLoading] = useState(false);


  // Carga del perfil completo

  useEffect(() => {
    if (!user?.idUsuario) return;

    let mounted = true;

    async function fetchPerfil() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8082/usuario/${user.idUsuario}`);
        if (!res.ok) throw new Error("No se pudo obtener perfil del usuario");

        const data: UsuarioBackend = await res.json();
        if (mounted) setPerfil(data);
      } catch (err) {
        console.warn("Error cargando perfil:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPerfil();
    return () => { mounted = false };
  }, [user]);


  // Datos a mostrar

  const nombre = perfil?.nomUsuario ?? "";
  const apellido = perfil?.apeUsuario ?? "";
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  const fechaNacimiento = perfil?.fechaNacUsuario ?? "";
  const correo = perfil?.correoUsuario ?? user.correo;

  const img =
    perfil?.imgUsuario && perfil.imgUsuario.trim() !== ""
      ? perfil.imgUsuario
      : "/images/default-user.png";

  return (
    <div className="cardSimple shadow p-4 mb-4 d-flex flex-column flex-md-row align-items-start w-100">
      
      {/* Lado izquierdo */}
      <div
        className="d-flex flex-column align-items-center me-md-4 mb-3 mb-md-0"
        style={{ minWidth: 200 }}
      >
        <img
          src={img}
          alt="Foto de perfil"
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid var(--color-morado)"
          }}
        />

        <h5 className="text-violeta mt-3">
          {nombreCompleto || "Usuario sin nombre"}
        </h5>

        {onEditar && (
          <button className="btn btn-primary mt-2" onClick={onEditar}>
            Editar Perfil
          </button>
        )}
      </div>

      {/* Informacion */}
      <div className="d-flex flex-wrap flex-grow-1 align-items-start">
        <div className="me-4 mb-3" style={{ minWidth: 260 }}>
          <p><strong>Nombre y apellido:</strong> {nombreCompleto || "-"}</p>
          <p>
            <strong>Fecha de nacimiento:</strong>{" "}
            {fechaNacimiento ? new Date(fechaNacimiento).toLocaleDateString() : "-"}
          </p>
          <p><strong>Correo electrónico:</strong> {correo}</p>
        </div>
      </div>
    </div>
  );
}
