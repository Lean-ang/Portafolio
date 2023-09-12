import {
    randomUUID
} from 'crypto'

function generarProducto() {
  // posibles valores para el título y la categoría
  const titulos = ["Samsung S23", "Samsung S23 Ultra", "Samsung S23 FE", "Samsung S22", "Samsung S22 FE", "Samgung S20", "Samsung S20 Ultra", "Iphone 14 Pro Max", "Iphone 14 Pro", "Iphone 13 Pro Max", "Iphone 12 Pro"]
  const categorias = ["SmartPhone", "Celular", "Comunicacion"]

  // Título y categoría al azar
  const titulo = titulos[Math.floor(Math.random() * titulos.length)];
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  const descripcion = `Celular  ${categoria}`;
  const precio = Math.floor(Math.random() * 10000) + 1; 
  const stock = Math.floor(Math.random() * 100) + 1; 
  const status = Math.random() < 0.5; 
  const code = randomUUID();
  const id = randomUUID();

  // devuelvo el producto generado
  return {
    "_id": id,//simulo _id de mongo 
    "title": titulo,
    "description": descripcion,
    "price": precio,
    "thumbnail": `${titulo}.jpg`,
    "stock": stock,
    "code": code,
    "category": categoria,
    "status": status,
    "id": id
  };
}

// Generador de array productos segun cantidad
export function generarProductos(cantidad) {
   const productos = [];
  for (let i = 0; i < cantidad; i++) {
    const producto = generarProducto();
    productos.push(producto);
  }
  return productos;
}



