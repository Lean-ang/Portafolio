import express, {Router} from 'express';
// import { productsDB } from '../../src/dao/models/schemaProducts.js';
import { productsDB } from '../../src/dao/models/schemaProducts.js';
import util from 'node:util'
// export const productManager = new ProductManager('./productos.txt');
import { io } from '../servidor.js';
import { productosService } from '../servicios/productosService.js';
import { carritosRepository } from '../repository/carritosRepository.js';
import { productosRepository } from '../repository/productosRepository.js';
import { Owner, onlyAdmin, onlyLoggedin } from '../middlewares/onlyLoggedin.js';
import nodemailer from "nodemailer";
import { winstonLogger } from '../utils/winstonLogger.js';
import { usuariosRepository } from '../repository/usuariosRepository.js';



export const productsRouter = Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({extended:true}))


productsRouter.get('/', async (req,res)=>{
try {
    const criterioDeBusqueda = { }

    const opcionesDePaginacion = {
        limit: req.query.limit || 10, 
        page: req.query.page || 1,
        lean: true, // para que devuelva objetos literales, no de mongoose
        sort :  {price : req.query.sort || -1},
        pagination: true,
        options: {category:req.query.query}
    }

    // @ts-ignore
    let result = await productsDB.paginate(criterioDeBusqueda, opcionesDePaginacion)

    const arrayProductos = []
    result.docs.forEach((res)=>{arrayProductos.push(util.inspect(res, false, 10))})
   
    const productosFiltradosXTitulo = []
    const filtrandoXTitulo =  result.docs.forEach((res)=>{if(res.title==req.query.query)
        productosFiltradosXTitulo.push(util.inspect(res, false, 10))})
    const filtroTitle = req.query.query

    
    const productosFiltradosXDisp = []
    const filtrandoXDisp =  result.docs.forEach((res)=>{if(res.status==true)
        productosFiltradosXDisp.push(util.inspect(res, false, 10))})
    const filtroTDisp = req.query.status

    const filtro = filtroTitle || filtroTDisp

    const context = {
        pageTitle: 'Products',
        hayDocs: result.docs.length > 0,
        docs: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
        sort:req.query.sort || -1,
        arrayProductos,
        filtroXTitulo: filtroTitle,
        // noHayFiltro:true,
        arrayFiltradoXTitulo: productosFiltradosXTitulo || arrayProductos,
        disponibilidad: filtroTDisp,
        arrayFiltradoXDisp: productosFiltradosXDisp,
        filtro:filtro
        }

    res.render('products.handlebars', context)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

} )

productsRouter.get('/admin',Owner, async (req, res) => {
   const productos = await productosRepository.buscarProductos()
   
    res.render('productsAdmin.handlebars',{
        encabezado: "Producto Admin",
        productos,
        usuario:req.user       
    })})


productsRouter.delete('/admin/:pid',onlyLoggedin,onlyAdmin,async(req,res,next)=>{
try {
    
    const pid = req.params.pid
    const productoParaEliminar = await productosRepository.buscarProductoPorId(pid)

    // @ts-ignore
    const owner = await usuariosRepository.buscarUsuarioPorUsername(productoParaEliminar.owner)
    if(owner.rol==="Mod"){

    // Configuración de Gmail
    let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
        user: "leanangprueba@outlook.com",
        pass: "prueba321", // contraseña de aplicacion
        },
    });
    
    // Crear mensaje 
    let mailOptions = {
        from: "leanangprueba@outlook.com", 
        // @ts-ignore
        to: productoParaEliminar.owner, 
        subject: "Producto eliminado",
        // @ts-ignore
        text: `Se le informa que uno de sus productos (id: ${productoParaEliminar._id} ) ha sido eliminado`,
    };
  
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        // Mensaje de error si falla
        winstonLogger.fatal(error)
        } else {
            // Mensaje de confirmación si se envía correctamente
            winstonLogger.debug("Correo enviado: " + info.response)
        }
    });
    }

    const productoEliminar =  await productosRepository.eliminarProducto(pid)

    res.json(productoEliminar)

} catch (error) {
    next(error)
}
})


    

productsRouter.get('/:pid', async (req,res,next)=>{

    try {
        const idProducto = req.params.pid
        
        const usuario1 = req.user
        // @ts-ignore
        const carritoUsuario = usuario1.cart
        // @ts-ignore
        const poductosLeidos = await productosRepository.buscarProductos()
        
        if (idProducto)  {
            const prodFiltradoID= await productosRepository.buscarProductoPorId(idProducto)
        // @ts-ignore
        if(prodFiltradoID.error=='PRODUCT-NOT-FOUND'){
            res.redirect('/api/products/admin')
        }else{
            res.render('productSelect', {
                encabezado: "Producto",
                producto:prodFiltradoID,
                carrito:carritoUsuario,
                // @ts-ignore
                usuario:usuario1['rol']
            })
        }
     } else {
                throw new Error('NOT-FOUND')
            }
          
        }
         catch(error) {
            next(error)
    }
} )



productsRouter.post('/',Owner, async (req, res,next) => {
    try {
        await productosRepository.buscarProductos()

        const producto1 =await productosService.crearProducto({
            ...req.body
        })
    
        const addProducto = await productosRepository.crear(producto1)
        if(addProducto){
            res.json(addProducto)
        }else{throw new Error('CREACION-FALLIDA')}
        } catch (error) {
        next(error)
    }
})



productsRouter.put('/:pid',onlyLoggedin,onlyAdmin,async( req,res,next)=>{
try {

    const getProds = await productosRepository.buscarProductos()
    const id= req.params.pid
    const prodActualizado = req.body

    await productosRepository.modificarProducto(id,prodActualizado)
    
    res.send(prodActualizado)
   
} catch (error) {
   next( new Error ('NOT-FOUND'))
}
} )

productsRouter.delete('/:pid',onlyLoggedin,onlyAdmin,async( req,res)=>{
    try {
    
        const getProds = await productosRepository.buscarProductos()
        const id= req.params.pid
        await productosRepository.eliminarProducto(id)
      
        res.send('Producto eliminado correctamente')
       
    } catch (error) {
       new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )


productsRouter.put('/productSelected/:pid',onlyLoggedin,onlyAdmin, async (req, res) => {
        const pid = req.params.pid
      
        io.on('connection', async clientSocket => {
                    clientSocket.on('agregarProducto',  valorInputAgregarCarrito => {
                    carritosRepository.agregarProductoAlCarrito(valorInputAgregarCarrito,pid)
                })
    
    
        })

        const productoFiltrado = await productosRepository.buscarProductoPorId(pid)
    
        res.render('productSelect.handlebars', {
                pid:JSON.stringify(pid),
               
                producto:util.inspect(productoFiltrado, false, 10)
               
            })
           
        
        })
        
