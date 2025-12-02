const URL_PRODUCTO = "http://localhost:8081/producto";
const URL_CATEGORIA = "http://localhost:8081/categorias";
const URL_MARCA = "http://localhost:8081/marca";

import type { Producto, Categoria, Marca } from "../interfaces/Producto";

//  Productos 

// Listar todos los productos
export async function listarProductos(): Promise<Producto[]> {
  const resp = await fetch(URL_PRODUCTO);
  if (!resp.ok) throw new Error("Error al obtener productos");
  return await resp.json();
}

// Obtener un producto por ID
export async function obtenerProducto(id: number): Promise<Producto> {
  const resp = await fetch(`${URL_PRODUCTO}/${id}`);
  if (!resp.ok) throw new Error("Producto no encontrado");
  return await resp.json();
}

// Crear un producto
export async function crearProducto(producto: Producto): Promise<Producto> {
  const resp = await fetch(URL_PRODUCTO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!resp.ok) throw new Error("Error al crear producto");
  return await resp.json();
}

// Actualizar un producto
export async function actualizarProducto(id: number, producto: Producto): Promise<Producto> {
  const resp = await fetch(`${URL_PRODUCTO}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!resp.ok) throw new Error("Error al actualizar producto");
  return await resp.json();
}

// Eliminar un producto
export async function eliminarProducto(id: number): Promise<void> {
  const resp = await fetch(`${URL_PRODUCTO}/${id}`, { method: "DELETE" });
  if (!resp.ok) throw new Error("Error al eliminar producto");
}

//  Categorias 

export async function listarCategorias(): Promise<Categoria[]> {
  const resp = await fetch(URL_CATEGORIA);
  if (!resp.ok) throw new Error("Error al obtener categorías");
  return await resp.json();
}

//  Marcas 

export async function listarMarcas(): Promise<Marca[]> {
  const resp = await fetch(URL_MARCA);
  if (!resp.ok) throw new Error("Error al obtener marcas");
  return await resp.json();
}
