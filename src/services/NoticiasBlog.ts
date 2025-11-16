import { clientes } from "../services/DatosSimulados";


export interface Comentario {
  id: number;
  id_cliente: number;
  texto: string;
  fecha: string;
}

export interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  contenido: string;
  resumen: string;
  imagen?: string;
  comentarios: Comentario[];
}

// Imagen por defecto
const imagenPorDefecto =
  "/images/usuarios/default.jpg";

// Noticias simuladas
export const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "Los juegos más esperados de 2025",
    fecha: "18/10/2025",
    resumen:
      "Exploramos los títulos más prometedores que llegarán este año al mundo gamer...",
    contenido: `
El 2025 promete ser un año espectacular para los videojuegos. Con la llegada de nuevas entregas 
de sagas icónicas y títulos completamente nuevos que redefinirán la experiencia gamer. 
Entre los más esperados se encuentran *Elder Ring 2*, *Cyberstrike 2099* y *Hollow Knight: Void’s Return*.`,
    imagen: "/images/blog/esperados.jpg",
    comentarios: [
      {
        id: 1,
        id_cliente: clientes[0].id_cliente,
        texto: "Excelente resumen, ya quiero probar esos títulos!",
        fecha: "19/10/2025",
      },
      {
        id: 2,
        id_cliente: clientes[1].id_cliente,
        texto: "Me alegra ver Hollow Knight en la lista ",
        fecha: "19/10/2025",
      },
    ],
  },
  {
    id: 2,
    titulo: "Cómo mejorar tu setup gamer",
    fecha: "10/10/2025",
    resumen:
      "Optimiza tu espacio de juego con estos consejos esenciales...",
    contenido: `
Un buen setup gamer no depende solo del hardware, sino también de la comodidad y la organización. 
Ajusta la iluminación, usa una silla ergonómica y mantén tu escritorio limpio para mejorar tu rendimiento y confort.`,
    imagen: "/images/blog/setupgamer.jpg",
    comentarios: [
      {
        id: 3,
        id_cliente: clientes[1].id_cliente,
        texto: "Muy buenos tips, especialmente lo de la iluminación.",
        fecha: "11/10/2025",
      },
    ],
  },
  {
    id: 3,
    titulo: "Eventos gamer que no puedes perderte",
    fecha: "05/10/2025",
    resumen:
      "Te contamos los principales eventos y torneos que llegan este año a Latinoamérica...",
    contenido: `
Desde el *GameFest Chile 2025* hasta la *Expo Gamer Argentina*, este año trae una agenda llena de 
oportunidades para competir, probar juegos y conocer a otros apasionados del gaming.`,
    imagen: "/images/blog/eventogamer.jpg",
    comentarios: [
      {
        id: 4,
        id_cliente: clientes[0].id_cliente,
        texto: "Voy al GameFest todos los años, no me lo pierdo!",
        fecha: "06/10/2025",
      },
    ],
  },
].map((n) => ({
  ...n,
  imagen: n.imagen || imagenPorDefecto,
}));
