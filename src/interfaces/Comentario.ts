export interface Comentario {
  id: number;
  detComentario: string;
  fechaComentario: string;
  idUsuario: number;
  noticiaId?: number;   
  noticia?: { id: number }; 
}
