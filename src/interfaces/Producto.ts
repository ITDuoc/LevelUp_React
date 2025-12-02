

export interface Categoria {
    idCategoria: number;
    nomCategoria: string;
    descCategoria: string;
    imgCategoria: string;
    estadoCategoria: number;
}

export interface Marca {
    idMarca: number;
    nomMarca: string;
    estadoMarca: number;
}

export interface Producto {
    idProducto: number;
    nomProducto: string;
    precioProducto: number;
    stockProducto: number;
    estadoProducto: number;
    imgProducto: string;
    categoria: Categoria | null;
    marca: Marca | null;
}
