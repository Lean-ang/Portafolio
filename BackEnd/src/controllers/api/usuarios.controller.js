import { usuariosService } from "../../servicios/usuariosService.js";
import { hashear } from "../../utils/criptografia.js";
import { carritosRepository } from "../../repository/carritosRepository.js";
import { usuariosRepository } from "../../repository/usuariosRepository.js";

export async function postAUsuarios(req,res,next){
    try {
        const carritoCreado = await carritosRepository.crearCarrito()
        const user = await usuariosService.crearUsuario({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashear(req.body.password), age: req.body.age, rol: req.body.rol,cart: carritoCreado._id });
        
        const registrado = await usuariosRepository.crearUsuario(user)
        req.logger.http("Usuario creado correctamente:" + registrado)
        req.login(user, error => {
            if (error) {
                next(error)
            } else {
                res.status(201).json(req.user)
            }
        })
    
    } catch (error) {
            req.logger.error(error.message)
            next(error)
         }
}

export async function getUsersController(req, res, next) {
    try {
    const users = await usuariosRepository.buscarUsuarios()
    res.json(users)
    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}


export async function postAUsuariosLogin(req,res,next){
    try {
    res.status(201).json({mensaje:'sesion iniciada correctamente'})
    } catch (error) {
        next(error)
    }
}

