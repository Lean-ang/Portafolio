class Carrito {
    
    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLocal;
        productosLocal = this.obtenerProductosLocalStorage();
        productosLocal.forEach(function(productoLocal){
            if(productoLocal.id === infoProducto.id){
                productosLocal = productoLocal.id;
            }   
        });

        if(productosLocal === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Algo anda mal..',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })     
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }

    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductoLocalStorage(producto);
    }
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }        
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e) {
        e.preventDefault();
        
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        
  
        this.vaciarLocalStorage();

        return false;
    }

    guardarProductoLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage() {
        let productosLocal;

        if (localStorage.getItem('productos') === null) {
            productosLocal = [];
        }
        else {
            productosLocal = JSON.parse(localStorage.getItem('productos'));
        }
        return productosLocal;
    }

    leerLocalStorage() {
        let productosLocal;
        productosLocal = this.obtenerProductosLocalStorage();

        productosLocal.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });

    }

    leerLocalStorageCompra() {
        let productosLocal;
        productosLocal = this.obtenerProductosLocalStorage();
        productosLocal.forEach(function (producto) {
                
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id="subtotall">${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    eliminarProductoLocalStorage(productoID){
        let productosLocal;
        productosLocal = this.obtenerProductosLocalStorage();
        productosLocal.forEach(function(productoLocal, index){
            if(productoLocal.id === productoID){
                productosLocal.splice(index,1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLocal));
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();
        console.log();
        if(this.obtenerProductosLocalStorage().length === 0){            
                Swal.fire({
                    type: 'error',
                    title: 'Algo anda mal..',
                    text: 'El carrito está vacío',
                    showConfirmButton: false,
                    timer: 2000
                })
        }
        else{
            location.href="compra.html";
        }
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productoLocal;
        console.log(e.target.classList);
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let productosLocal = this.obtenerProductosLocalStorage();
             productosLocal.forEach(function (productoLocal, index) {
                if (productoLocal.id === id) {
                    productoLocal.cantidad = cantidad;
                }
    
            });
            localStorage.setItem('productos', JSON.stringify(productosLocal));
        }
    }
    
    calcularTotal() {
        let productosLocal;
        let total = 0;
        productosLocal = this.obtenerProductosLocalStorage();
        for (let index = 0; index < productosLocal.length; index++) {
            let element = Number(productosLocal[index].precio * productosLocal[index].cantidad);
            total = total + element;
        }
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);
    }
   
    
}