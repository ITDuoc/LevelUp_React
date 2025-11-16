import type {
  Region,
  Ciudad,
  Comuna,
  Cliente,
  Vendedor,
  Administrador,
  Categoria,
  Marca,
  Producto,
  MetodoPago,
  EstadoVenta,
  Venta,
  DetalleVenta,
  Carrito,
  DetalleCarrito,
  Resenia
} from "./interfaces";


// *** DATOS SIMULADOS ***

// Regiones
export const regiones: Region[] = [
  {
    id_region: 1,
    nombre_region: "Región Metropolitana"
  },
  {
    id_region: 2,
    nombre_region: "Bio-Bio"
  },
];

// Ciudades
export const ciudades: Ciudad[] = [
  {
    id_ciudad: 1,
    nombre_ciudad: "Santiago",
    id_region: 1
  },
  {
    id_ciudad: 2,
    nombre_ciudad: "Concepción",
    id_region: 2
  },
];

// Comunas
export const comunas: Comuna[] = [
  {
    id_comuna: 1,
    nombre_comuna: "Providencia",
    id_ciudad: 1
  },
  {
    id_comuna: 2,
    nombre_comuna: "Maipú",
    id_ciudad: 1
  },
  {
    id_comuna: 3,
    nombre_comuna: "San Pedro de la Paz",
    id_ciudad: 2
  },
  {
    id_comuna: 4,
    nombre_comuna: "Talcahuano",
    id_ciudad: 2
  },
];

// Clientes
export const clientes: Cliente[] = [
  {
    id_cliente: 1,
    nombre_cliente: "Ignacio",
    apellido_cliente: "Tapia",
    correo_cliente: "i.tapiad@duocuc.cl",
    contrasenia_cliente: "123456",
    telefono: "987654321",
    direccion: "Calle Falsa 123",
    id_comuna: 3,
    fecha_nac_cliente: "1995-10-31",
    imagen_cliente: "/images/usuarios/default.jpg"
  },
  {
    id_cliente: 2,
    nombre_cliente: "Maria",
    apellido_cliente: "Gonzalez",
    correo_cliente: "maria@gmail.com",
    contrasenia_cliente: "123456",
    direccion: "Avenida Siempre Viva 742",
    telefono: "912345678",
    id_comuna: 2,
    fecha_nac_cliente: "1995-08-12",
    imagen_cliente: "/images/usuarios/maria.jpg"
  },
  {
    id_cliente: 3,
    nombre_cliente: "Juan",
    apellido_cliente: "Perez",
    correo_cliente: "juan@gmail.com",
    contrasenia_cliente: "123456",
    direccion: "Calle 12 123",
    id_comuna: 4,
    fecha_nac_cliente: "1998-10-24",
    imagen_cliente: "/images/usuarios/juan.jpg"
  },
  {
    id_cliente: 4,
    nombre_cliente: "David",
    apellido_cliente: "Fuentes",
    correo_cliente: "david@gmail.com",
    contrasenia_cliente: "123456",
    direccion: "Rio bueno 432",
    id_comuna: 3,
    fecha_nac_cliente: "1995-08-12",
    imagen_cliente: "/images/usuarios/david.jpg"
  },
  {
    id_cliente: 5,
    nombre_cliente: "Javier",
    apellido_cliente: "Gomez",
    correo_cliente: "javier@gmail.com",
    contrasenia_cliente: "123456",
    direccion: "Av Providencia 6543",
    id_comuna: 1,
    fecha_nac_cliente: "1995-01-25",
    imagen_cliente: "/images/usuarios/javier.jpg"
  },
];

// Vendedores
export const vendedores: Vendedor[] = [
  {
    id_vendedor: 1,
    nombre_vendedor: "Carolina",
    apellido_vendedor: "Lopez",
    correo_vendedor: "caro@gmail.com",
    contrasenia_vendedor: "123456",
    fecha_nac_vendedor: "1985-03-15",
    imagen_vendedor: "/images/usuarios/carolina.jpg"
  },
];

// Administradores
export const administradores: Administrador[] = [
  {
    id_administrador: 1,
    nombre_administrador: "Valentina",
    apellido_administrador: "Rosas",
    correo_administrador: "admin@gmail.com",
    contrasenia_administrador: "123456",
    fecha_nac_administrador: "1990-01-01",
    imagen_administrador: "/images/usuarios/valentina.jpg"
  },
];

// Categorías
export const categorias: Categoria[] = [
  {
    id_categoria: 1,
    nombre_categoria: "Juegos de Mesa",
    descripcion_categoria: "Gan variedad de Juegos de Mesa",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/juegosdemesa.jpg"
  },
  {
    id_categoria: 2,
    nombre_categoria: "Accesorios",
    descripcion_categoria: "Todo tipo de accesorios gamer",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/accesorios.jpg"
  },
  {
    id_categoria: 3,
    nombre_categoria: "Consolas",
    descripcion_categoria: "Todas las consolas de todas las marcas",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/consola.jpg"
  },
  {
    id_categoria: 4,
    nombre_categoria: "Computadores Gamer",
    descripcion_categoria: "Pc Gamers desde gama media a alta",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/pcgamer.jpg"
  },
  {
    id_categoria: 5,
    nombre_categoria: "Sillas gamer",
    descripcion_categoria: "Todo tipo de sillas pensadas para Gamers",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/sillasgamer.jpg"
  },
  {
    id_categoria: 6,
    nombre_categoria: "Mouse",
    descripcion_categoria: "Amplia gama de mouses pra potenciar tu juego",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/mouse.jpg"
  },
  {
    id_categoria: 7,
    nombre_categoria: "Mousepad",
    descripcion_categoria: "Gran variedad de mousepad para tu escritorio",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/mousepad.jpg"
  },
  {
    id_categoria: 8,
    nombre_categoria: "Poleras Personalizadas",
    descripcion_categoria: "Poleras estampadas con diseños gamer y geek",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/polera.jpg"
  },
  {
    id_categoria: 9,
    nombre_categoria: "Polerones Gamer",
    descripcion_categoria: "Gran variedad de polerones con diseños gamer y geek",
    estado_categoria: true,
    imagen_categoria: "/images/categorias/poleron.jpg"
  },
];


// Marcas
export const marcas: Marca[] = [
  {
    id_marca: 1,
    nombre_marca: "Devir",
    estado_marca: true
  },
  {
    id_marca: 2,
    nombre_marca: "Logitech",
    estado_marca: true
  },
  {
    id_marca: 3,
    nombre_marca: "Razer",
    estado_marca: true
  },
  {
    id_marca: 4,
    nombre_marca: "Sony",
    estado_marca: true
  },
  {
    id_marca: 5,
    nombre_marca: "Microsoft",
    estado_marca: true
  },
  {
    id_marca: 6,
    nombre_marca: "Asus",
    estado_marca: true
  },
  {
    id_marca: 7,
    nombre_marca: "Gear",
    estado_marca: true
  },
  {
    id_marca: 8,
    nombre_marca: "Bloody",
    estado_marca: true
  },
  {
    id_marca: 9,
    nombre_marca: "Spektra",
    estado_marca: true
  },
  {
    id_marca: 10,
    nombre_marca: "Game-Design",
    estado_marca: true
  },
];

// Productos
export const productos: Producto[] = [
  {
    id_producto: 1,
    nombre_producto: "Catan",
    precio: 60000,
    stock: 5,
    estado_producto: true,
    id_categoria: 1,
    id_marca: 1,
    imagen_producto: "/images/productos/catan.jpg",
    descripcion_producto: "Juego de mesa de estategia",
  },
  {
    id_producto: 2,
    nombre_producto: "Cities",
    precio: 60000,
    stock: 10,
    estado_producto: true,
    id_categoria: 1,
    id_marca: 1,
    imagen_producto: "/images/productos/cities.jpg",
    descripcion_producto: "Juego de mesa de estrategia",
  },
  {
    id_producto: 3,
    nombre_producto: "Covenant",
    precio: 60000,
    stock: 10,
    estado_producto: true,
    id_categoria: 1,
    id_marca: 1,
    imagen_producto: "/images/productos/covenant.jpg",
    descripcion_producto: "Juego de mesa de estrategia",
  },
  {
    id_producto: 4,
    nombre_producto: "Teclado Razer Black",
    precio: 10000,
    stock: 10,
    estado_producto: true,
    id_categoria: 2,
    id_marca: 3,
    imagen_producto: "/images/productos/tecladorazer.jpg",
    descripcion_producto: "Teclado gamer RGB",
  },
  {
    id_producto: 5,
    nombre_producto: "Audifonos G432",
    precio: 40000,
    stock: 10,
    estado_producto: true,
    id_categoria: 2,
    id_marca: 2,
    imagen_producto: "/images/productos/audifonos.jpg",
    descripcion_producto: "Audifonos Gamer sonido 7.5",
  },
  {
    id_producto: 6,
    nombre_producto: "Play Station 5",
    precio: 750000,
    stock: 10,
    estado_producto: true,
    id_categoria: 3,
    id_marca: 4,
    imagen_producto: "/images/productos/play.jpg",
    descripcion_producto: "Consola de juego Play Station 5 basica + juego",
  },
  {
    id_producto: 7,
    nombre_producto: "X-box X/S Series",
    precio: 750000,
    stock: 10,
    estado_producto: true,
    id_categoria: 3,
    id_marca: 5,
    imagen_producto: "/images/productos/xbox.jpg",
    descripcion_producto: "Consola de juegos de microsoft x-box",
  },
  {
    id_producto: 8,
    nombre_producto: "ASUS ROG STRIX G17 G713PV",
    precio: 950000,
    stock: 10,
    estado_producto: true,
    id_categoria: 4,
    id_marca: 6,
    imagen_producto: "/images/productos/noteasus.jpg",
    descripcion_producto: "NOTEBOOK GAMER ASUS ROG STRIX G17 G713PV-HX165W AMD RYZEN 9 16GB RAM 1TB SSD NVIDIA RTX 4060 17.3”",
  },
  {
    id_producto: 9,
    nombre_producto: "ASUS TUF F15 FX507VV-LP139W",
    precio: 1350000,
    stock: 10,
    estado_producto: true,
    id_categoria: 4,
    id_marca: 6,
    imagen_producto: "/images/productos/noteasus2.jpg",
    descripcion_producto: "NOTEBOOK GAMER ASUS TUF F15 FX507VV-LP139W INTEL CORE I7 16GB RAM 512GB SSD NVIDIA RTX 4060 15.6",
  },
  {
    id_producto: 10,
    nombre_producto: "Silla Gamer azul",
    precio: 170000,
    stock: 10,
    estado_producto: true,
    id_categoria: 5,
    id_marca: 7,
    imagen_producto: "/images/productos/sillaazul.jpg",
    descripcion_producto: "Silla Gamer de color Azul",
  },
  {
    id_producto: 11,
    nombre_producto: "Silla Gamer blanca",
    precio: 170000,
    stock: 10,
    estado_producto: true,
    id_categoria: 5,
    id_marca: 7,
    imagen_producto: "/images/productos/sillablanca.jpg",
    descripcion_producto: "Silla Gamer de color Blanco",
  },
  {
    id_producto: 12,
    nombre_producto: "Mouse gamer bloody",
    precio: 25000,
    stock: 10,
    estado_producto: true,
    id_categoria: 6,
    id_marca: 8,
    imagen_producto: "/images/productos/mousebloody.jpg",
    descripcion_producto: "Mouse Gamer de alto rendimiento con led de color rojo",
  },
  {
    id_producto: 13,
    nombre_producto: "Mouse logitch G502",
    precio: 45000,
    stock: 10,
    estado_producto: true,
    id_categoria: 6,
    id_marca: 2,
    imagen_producto: "/images/productos/mouselogitech.jpg",
    descripcion_producto: "Mouse gamer inalambrico",
  },
  {
    id_producto: 14,
    nombre_producto: "Mouse logitch G203",
    precio: 30000,
    stock: 10,
    estado_producto: true,
    id_categoria: 6,
    id_marca: 2,
    imagen_producto: "/images/productos/mouselogitech2.jpg",
    descripcion_producto: "Mouse gamer con cable",
  },
  {
    id_producto: 15,
    nombre_producto: "Mousepad Negro",
    precio: 8000,
    stock: 10,
    estado_producto: true,
    id_categoria: 7,
    id_marca: 9,
    imagen_producto: "/images/productos/mousepadspektra.jpg",
    descripcion_producto: "Mousepad negro tamaño s",
  },
  {
    id_producto: 16,
    nombre_producto: "Mousepad RGB",
    precio: 30000,
    stock: 10,
    estado_producto: true,
    id_categoria: 7,
    id_marca: 9,
    imagen_producto: "/images/productos/mousepadspektrargb.jpg",
    descripcion_producto: "Mousepad RBG tamaño XL",
  },
  {
    id_producto: 17,
    nombre_producto: "Poleras personalizadas",
    precio: 30000,
    stock: 10,
    estado_producto: true,
    id_categoria: 8,
    id_marca: 10,
    imagen_producto: "/images/productos/polera.jpg",
    descripcion_producto: "Gran variedad de diseños",
  },
  {
    id_producto: 18,
    nombre_producto: "Polerones personalizados",
    precio: 40000,
    stock: 10,
    estado_producto: true,
    id_categoria: 9,
    id_marca: 10,
    imagen_producto: "/images/productos/poleron.jpg",
    descripcion_producto: "Gran variedad de diseños",
  },
  
];


// Metodos de Pago
export const metodosPago: MetodoPago[] = [
  {
    id_metodo_pago: 1,
    nombre_met_pago: "Tarjeta de Crédito",
    descripcion_met_pago: "Visa, Mastercard",
    estado_met_pago: true
  },
  {
    id_metodo_pago: 2,
    nombre_met_pago: "Tarjeta de Débito",
    descripcion_met_pago: "Pago directo desde tu banco",
    estado_met_pago: true
  },
  {
    id_metodo_pago: 3,
    nombre_met_pago: "Efectivo",
    descripcion_met_pago: "Pago en efectivo al recibir",
    estado_met_pago: true
  },
];

// Estados de Venta
export const estadosVenta: EstadoVenta[] = [
  {
    id_estado_venta: 1,
    nombre_estado_venta: "Pendiente",
    descripcion_estado_venta: "Pago pendiente"
  },
  {
    id_estado_venta: 2,
    nombre_estado_venta: "Procesando",
    descripcion_estado_venta: "Preparando envío"
  },
  {
    id_estado_venta: 3,
    nombre_estado_venta: "Enviado",
    descripcion_estado_venta: "Pedido en camino"
  },
  {
    id_estado_venta: 4,
    nombre_estado_venta: "Completado",
    descripcion_estado_venta: "Pedido entregado"
  },
  {
    id_estado_venta: 5,
    nombre_estado_venta: "Cancelado",
    descripcion_estado_venta: "Pedido cancelado"
  },
];

// Ventas
export const ventas: Venta[] = [
  {
    id_venta: 1,
    fecha_venta: "2025-10-20",
    total_venta: 160000,
    id_cliente: 1,
    id_metodo_pago: 1,
    id_estado_venta: 4,
    direccion_envio: "Calle Falsa 123, Providencia",
    id_comuna: 1,
    id_vendedor: 1,
  },
  {
    id_venta: 2,
    fecha_venta: "2025-10-22",
    total_venta: 80000,
    id_cliente: 2,
    id_metodo_pago: 2,
    id_estado_venta: 2,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 3,
    fecha_venta: "2025-07-10",
    total_venta: 60000,
    id_cliente: 2,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 4,
    fecha_venta: "2025-04-10",
    total_venta: 50000,
    id_cliente: 3,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 5,
    fecha_venta: "2025-09-10",
    total_venta: 600000,
    id_cliente: 4,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 6,
    fecha_venta: "2025-02-10",
    total_venta: 40000,
    id_cliente: 1,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 7,
    fecha_venta: "2025-11-10",
    total_venta: 750000,
    id_cliente: 1,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 8,
    fecha_venta: "2025-06-10",
    total_venta: 950000,
    id_cliente: 1,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 9,
    fecha_venta: "2025-07-10",
    total_venta: 60000,
    id_cliente: 5,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
  {
    id_venta: 10,
    fecha_venta: "2025-04-10",
    total_venta: 60000,
    id_cliente: 4,
    id_metodo_pago: 2,
    id_estado_venta: 4,
    direccion_envio: "Avenida Siempre Viva 742, Vitacura",
    id_comuna: 2,
    id_vendedor: 1,
  },
];

// Detalles de Ventas
export const detalleVentas: DetalleVenta[] = [
  {
    id_detalle: 1,
    id_venta: 1,
    id_producto: 1,
    cantidad: 1,
    precio: 60000,
    subtotal: 60000,
    total: 60000,
    descuento: 0,
  },
  {
    id_detalle: 2,
    id_venta: 2,
    id_producto: 2,
    cantidad: 1,
    precio: 60000,
    subtotal: 60000,
    total: 60000,
    descuento: 0,
  },
  {
    id_detalle: 3,
    id_venta: 3,
    id_producto: 3,
    cantidad: 1,
    precio: 60000,
    subtotal: 60000,
    total: 60000,
    descuento: 0,
  },
  {
    id_detalle: 4,
    id_venta: 4,
    id_producto: 4,
    cantidad: 1,
    precio: 100000,
    subtotal: 100000,
    total: 100000,
    descuento: 0,
  },{
    id_detalle: 5,
    id_venta: 5,
    id_producto: 5,
    cantidad: 1,
    precio: 40000,
    subtotal: 40000,
    total: 40000,
    descuento: 0,
  },{
    id_detalle: 6,
    id_venta: 6,
    id_producto: 5,
    cantidad: 1,
    precio: 40000,
    subtotal: 40000,
    total: 40000,
    descuento: 0,
  },
  {
    id_detalle: 7,
    id_venta: 7,
    id_producto: 8,
    cantidad: 1,
    precio: 950000,
    subtotal: 950000,
    total: 950000,
    descuento: 0,
  },
  {
    id_detalle: 8,
    id_venta: 8,
    id_producto: 11,
    cantidad: 1,
    precio: 170000,
    subtotal: 170000,
    total: 170000,
    descuento: 0,
  },{
    id_detalle: 9,
    id_venta: 9,
    id_producto: 13,
    cantidad: 1,
    precio: 45000,
    subtotal: 45000,
    total: 45000,
    descuento: 0,
  },
  {
    id_detalle: 10,
    id_venta: 10,
    id_producto: 17,
    cantidad: 1,
    precio: 30000,
    subtotal: 30000,
    total: 30000,
    descuento: 0,
  },
];

// Carritos
export const carritos: Carrito[] = [
  {
    id_carrito: 1,
    id_cliente: 1,
    activo: true
  },
  {
    id_carrito: 2,
    id_cliente: 2,
    activo: true
  },
];

// Detalles de Carritos
export const detalleCarritos: DetalleCarrito[] = [
  {
    id_det_carrito: 1,
    id_carrito: 1,
    id_producto: 2,
    cantidad: 1,
    total: 60000
  },
  {
    id_det_carrito: 2,

    id_carrito: 1,
    id_producto: 1,
    cantidad: 1,
    total: 100000
  },
  {
    id_det_carrito: 3,
    id_carrito: 2,
    id_producto: 2,
    cantidad: 2,
    total: 120000
  },
];

// Reseñas
export const resenias: Resenia[] = [
  {
    id_resenia: 1,
    id_cliente: 1,
    id_producto: 1,
    comentario: "Excelente teclado, muy cómodo y rápido!",
    fecha_resenia: "2025-10-10",
  },
  {
    id_resenia: 2,
    id_cliente: 2,
    id_producto: 2,
    comentario: "El mouse es preciso y ligero, recomendado.",
    fecha_resenia: "2025-10-12",
  },
];


// Eventos Gamer
export const eventoGamer = {
  id_evento: 1,
  nombre: "LAN Party Ultimate",
  fecha: "25 de Octubre, 2025",
  lugar: "Movistar Arena",
  descripcion:
    "Ven y participa en la LAN Party más épica de la ciudad: torneos, sorteos y mucho gaming.",
  mapaEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13313.888410286358!2d-70.657737395679!3d-33.46305745165718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c51b935c0c23%3A0xfe177137c9c9c6c8!2sMovistar%20Arena!5e0!3m2!1ses-419!2scl!4v1760846314099!5m2!1ses-419!2scl",
};
