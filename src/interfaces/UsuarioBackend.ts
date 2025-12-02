export interface RolBackend {
  idRol: number;
  nomRol: string;
}

export interface UsuarioBackend {
  idUsuario: number;
  nomUsuario: string;
  apeUsuario: string;
  correoUsuario: string;
  passUsuario: string;
  fechaNacUsuario: string;
  estadoUsuario: number;
  imgUsuario: string;
  roles: RolBackend[];
}


export type UsuarioEditable = Omit<UsuarioBackend, "idUsuario"> & {
  idUsuario?: number;
};
