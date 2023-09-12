import { Router } from 'express';
import { onlyAdmin, onlyLoggedin, Owner } from '../middlewares/onlyLoggedin.js';
import { postAUsuarios, postAUsuariosLogin } from '../controllers/api/usuarios.controller.js';
import { autenticacionUserPass } from '../middlewares/passport.js';
import { deleteSesiones } from '../controllers/api/usuariosLogout.controller.js';
import { reestablecerPost } from '../controllers/api/reestablecer.controller.js';
import { multerUpload } from '../middlewares/multer.js';
import { getMulterDocuments } from '../controllers/api/getMulterDocuments.controller.js';
import { usuariosRepository } from '../repository/usuariosRepository.js';

export const userRouter = Router()

userRouter.get('/info', onlyLoggedin, (req, res, next) => {
    res.json(req.user)
})

userRouter.post('/',postAUsuarios)

userRouter.post('/login', autenticacionUserPass, postAUsuariosLogin);

userRouter.delete('/login', deleteSesiones)

userRouter.post('/reestablecer',onlyLoggedin, reestablecerPost)

userRouter.get('/mod/documents',Owner ,getMulterDocuments)

userRouter.post('/mod/:uid/documents',Owner, multerUpload.single('archivo'), (req, res) => {
   
    let archivo = req.file;
    res.json({message:`Archivo cargado correctamente bajo el nombre: ${req.file?.filename}, en la ruta ${req.file?.path}`});
  });

userRouter.get('/', onlyLoggedin,onlyAdmin,async (req, res, next) => {
   const usuarios = await usuariosRepository.buscarUsuarios()
   const usuariosModificados = usuarios.map(function (usuario) {
    return {
      email: usuario.email,
      nombre: usuario.first_name + " " + usuario.last_name,
      carrito:usuario.cart,
      rol:usuario.rol,
      ultima_conexion:usuario.last_connection,
    };
  });

  const hayUsuarios = usuariosModificados.length > 0
      
  res.render('usersList.handlebars', {
    titulo: 'Lista de usuarios',
    encabezado: 'Lista de usuarios en base de datos, sin datos sensibles',
    arrayUsuarios:usuariosModificados,
    hayUsuarios: hayUsuarios,

})

})


userRouter.get('/bussy/',onlyLoggedin,onlyAdmin,async(req,res,next)=>{

    const usuarios = await usuariosRepository.buscarUsuarios()
  
    const fechaActual = new Date();
 
    function esMasDeDosDias(date) {
        // @ts-ignore
        const tiempoTranscurrido = fechaActual - date;
        const dosDiasEnMilisegundos = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
        // const dosDiasEnMilisegundos = 2 ; // 2 días en milisegundos
        return tiempoTranscurrido > dosDiasEnMilisegundos;
    }   
    
    const fechaSinFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=Date.parse(usuario.last_connection)
    })

    const usuariosFiltrados = usuarios.filter(usuario => esMasDeDosDias(usuario.last_connection));

    const fechaConFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=new Date(usuario.last_connection).toLocaleString()
    })

    res.render('usersBussyList.handlebars', {
        titulo: 'Lista de usuarios ausentes',
        encabezado: 'Lista de usuarios "ausentes" en base de datos, sin datos sensibles',
        arrayUsuarios:usuariosFiltrados,
        hayUsuarios: usuariosFiltrados.length>0,
    
    })

})

userRouter.put('/',onlyLoggedin,onlyAdmin,async(req,res,next)=>{
  try {
    const IDingresado = req.body
    const usuarioString = IDingresado.username
    const usuarioEncontrado =await usuariosRepository.buscarUsuarioPorUsername(usuarioString)

      switch (usuarioEncontrado.rol) {
        case 'Admin':
          res.status(203).json({message:"Solo puede modificar el rol de User y Mod"})
          break;
      
        case 'Mod':
            usuarioEncontrado.rol = "User"
            await usuariosRepository.actualizarUsuario(usuarioEncontrado._id,usuarioEncontrado)
            res.status(201).json(usuarioEncontrado)
            break;
      
        case 'User':
            usuarioEncontrado.rol = "Mod"
            await usuariosRepository.actualizarUsuario(usuarioEncontrado._id,usuarioEncontrado)
            res.status(201).json(usuarioEncontrado)
            break;

        default:
          res.status(405).json({message:"Rol de usuario no valido"})
          break;
      }
     
  } catch (error) {

    next(error)
  }
})

userRouter.delete('/',onlyLoggedin,onlyAdmin,async(req,res,next)=>{
    const usuarios = await usuariosRepository.buscarUsuarios()

    const fechaActual = new Date();

    function esMasDeDosDias(date) {
        // @ts-ignore
        const tiempoTranscurrido = fechaActual - date;
        const dosDiasEnMilisegundos = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
        // const dosDiasEnMilisegundos = 2 ; // 2 días en milisegundos
        return tiempoTranscurrido > dosDiasEnMilisegundos;
    }   
    
    const fechaSinFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=Date.parse(usuario.last_connection)
    })


    const arrayFiltrados = []

    const usuariosFiltrados = usuarios.filter(usuario => esMasDeDosDias(usuario.last_connection));
    usuariosFiltrados.forEach((usuariosFiltrado)=>{
        arrayFiltrados.push(usuariosFiltrado)
    })

    const eliminarUsuarios = arrayFiltrados.forEach(async(usuario)=>{
        await usuariosRepository.eliminarUsuario( usuario._id)
    })

    res.status(201).json({message:"usuarios eliminados correctamente"})

})