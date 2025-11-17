// Tablas simuladas

// *** INTERFACES ***
export interface Region {
  id_region: number;
  nombre_region: string;
}

export interface Ciudad {
  id_ciudad: number;
  nombre_ciudad: string;
  id_region: number;
}

export interface Comuna {
  id_comuna: number;
  nombre_comuna: string;
  id_ciudad: number;
}

export interface Cliente {
  id_cliente: number;
  nombre_cliente: string;
  apellido_cliente: string;
  correo_cliente: string;
  contrasenia_cliente: string;
  telefono?: string;
  direccion: string;
  id_comuna: number;
  fecha_nac_cliente: string;
  imagen_cliente?: string;
}

export interface Vendedor {
  id_vendedor: number;
  nombre_vendedor: string;
  apellido_vendedor: string;
  correo_vendedor: string;
  contrasenia_vendedor: string;
  fecha_nac_vendedor: string;
  imagen_vendedor?: string;
}

export interface Administrador {
  id_administrador: number;
  nombre_administrador: string;
  apellido_administrador: string;
  correo_administrador: string;
  contrasenia_administrador: string;
  fecha_nac_administrador: string;
  imagen_administrador?: string;
}

export interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
  descripcion_categoria: string;
  estado_categoria: boolean;
  imagen_categoria: string;
}


export interface Marca {
  id_marca: number;
  nombre_marca: string;
  estado_marca: boolean;
  imagen_marca?: string;
}

export interface Producto {
  id_producto: number;
  nombre_producto: string;
  precio: number;
  stock: number;
  estado_producto: boolean;
  id_categoria: number;
  id_marca: number;
  imagen_producto: string;
  descripcion_producto: string;
}

export interface MetodoPago {
  id_metodo_pago: number;
  nombre_met_pago: string;
  descripcion_met_pago: string;
  estado_met_pago: boolean;
  icono_met_pago?: string;
}

export interface EstadoVenta {
  id_estado_venta: number;
  nombre_estado_venta: string;
  descripcion_estado_venta: string;
}

export interface Venta {
  id_venta: number;
  fecha_venta: string;
  total_venta: number;
  id_cliente: number;
  id_metodo_pago: number;
  id_estado_venta: number;
  direccion_envio: string;
  id_comuna: number;
  id_vendedor: number;
}

export interface DetalleVenta {
  id_detalle: number;
  id_venta: number;
  id_producto: number;
  cantidad: number;
  precio: number;
  subtotal: number;
  total: number;
  descuento: number;
}

export interface Carrito {
  id_carrito: number;
  id_cliente: number;
  activo: boolean;
}

export interface DetalleCarrito {
  id_det_carrito: number;
  id_carrito: number;
  id_producto: number;
  cantidad: number;
  total: number;
}

export interface Resenia {
  id_resenia: number;
  id_cliente: number;
  id_producto: number;
  comentario: string;
  fecha_resenia: string;
}