export interface DetalleVenta {
  id?: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  fechaVenta: string; 
  dirEnvio: string;
  totalVenta: number;
  idUsuario: number;
  idMetodoPago: number;
  idEstadoVenta: number;
  detalles?: DetalleVenta[];
}
