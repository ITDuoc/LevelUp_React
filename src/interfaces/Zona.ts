export interface Region {
  id?: number;
  nombre: string;
}

export interface Ciudad {
  id?: number;
  nombre: string;
  region: Region;
}

export interface Comuna {
  id?: number;
  nombre: string;
  ciudad: Ciudad;
}
