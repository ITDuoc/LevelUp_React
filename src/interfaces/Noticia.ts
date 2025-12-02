export interface Comentario {
  id: number;
  idUsuario: number;
  detComentario: string;
  fechaComentario: string;
}

export interface Noticia {
  id: number;
  nomNoticia: string;
  detNoticia: string;
  fechaNoticia: string;
  imgNoticia: string;
  comentarios: Comentario[];
}
