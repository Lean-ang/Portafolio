
// @ts-ignore
const serverSocket = io()
const btnLoad = document.getElementById('btnLoad')
const btnDelete = document.getElementById('btnDelete')
const deleteID = document.getElementById('deleteID')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const urlIMG = document.getElementById('urlIMG')
const stock = document.getElementById('stock')
const code = document.getElementById('code')
const category = document.getElementById('category')
const statusTrue = document.getElementById('status')


btnDelete?.addEventListener("click", (e)=>{
    e.preventDefault()
   // @ts-ignore
    const idDelete = deleteID?.value

    serverSocket.emit('eliminarProducto', idDelete)
    location.reload()
}, {once: true} )

// @ts-ignore
btnLoad?.addEventListener("click", (e)=>{
    e.preventDefault()
    // @ts-ignore
    const valorTitulo= title?.value
    // @ts-ignore
    const valorDescripcion= description?.value
    // @ts-ignore
    const valorPrecio= parseInt(price?.value)
    // @ts-ignore
    const valorUrlIMG= urlIMG?.value
    // @ts-ignore
    const valorStock= parseInt(stock?.value)
    // @ts-ignore
    const valorCodigo= code?.value
    // @ts-ignore
    const valorCategoria= category?.value
    // @ts-ignore
    const valorStatus= statusTrue?.value || true

    const addProduct = {"title":valorTitulo,"description":valorDescripcion,"price":valorPrecio,"thumbnail":valorUrlIMG,"stock":valorStock,"code":valorCodigo,"category":valorCategoria,"status":valorStatus}

serverSocket.emit('nuevoProducto', addProduct)

location.reload()

}, {once: true} )

const form = document.getElementById('form')
if(form){
    form.addEventListener('submit', e=>{
        e.preventDefault()
    })
}
   
const plantillaMensajes = `
    {{#if hayProductos}}
    <h4>PRODUCTOS</h4>
    <ul>
        {{#each productos}}
        <li>{{this}}</li>
        {{/each}}
    </ul>
    {{else}}
    <p class="text-danger">sin productos...</p>
    {{/if}}
    
    `
// @ts-ignore
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)
    
serverSocket.on('actualizarProductos', productosStorage => {
        
 try {
    const divProducts = document.getElementById('products')
       
    if (divProducts) {
    //   const productos = []
      const productsID = []
    
    //   productosStorage.forEach(element => {productos.push(JSON.stringify(element))})
      productosStorage.forEach(element => {productsID.push(element)})

    let lista = "<ul>";
    for (let product of productsID) {
        const productParseado = JSON.stringify(product)
        const IdProduct = product._id

        const url = window.location.origin; 
        const url2 = url + `/api/products/${IdProduct}` 
                       
        lista += `<li>${productParseado} <button onclick="window.location.href='${url2}'" >Ver</button></li>`;      
      }
      lista += "</ul> ";
     
      divProducts.innerHTML = lista;
    }
    
 } catch (error) {
    throw new Error("NOT-FOUND")
 }
})


