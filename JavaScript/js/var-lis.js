//VARIABLES
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');
const url = 'https://pokeapi.co/api/v2/pokemon-form/25/'
     fetch(url)
     .then(Response => Response.json())
     .then(data =>{
      let element = document.getElementById('elemento')
      element.innerHTML = `
      <img src='${data.sprites.front_default}' />
      `;
     })
     .catch(err=>console.log(err))



//LISTENERS
cargarEventListeners();

function cargarEventListeners() {
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
    
}