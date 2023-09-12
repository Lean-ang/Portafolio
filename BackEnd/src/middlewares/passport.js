import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { hashear, validarQueSeanIguales } from '../utils/criptografia.js'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { usuariosService } from '../servicios/usuariosService.js'
import { usuariosRepository } from '../repository/usuariosRepository.js'
import { winstonLogger } from '../utils/winstonLogger.js'


// @ts-ignore
passport.use('local', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
        let buscado
        try {
            buscado = await usuariosRepository.buscarUsuarioPorUsername(req.body.email)
            buscado.last_connection=new Date().toLocaleString()
            
        } catch (error) {
            return done(new Error('error de autenticacion'))
        }
    
        // @ts-ignore
        if (!validarQueSeanIguales(req.body.password, buscado['password'])) {
            return done(null, false, { message: 'Contraseña incorrecta' })
        }
      
        // @ts-ignore
        done(null, buscado)
        } catch (error) {
         throw new Error('ERROR_DE_AUTENTICACION')
        }
    })
  );

  // @ts-ignore
  passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl,
    scope: ['user:email']

}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value
        const usuarioBuscado = await usuariosRepository.buscarUsuarioPorUsername(email)
        if (usuarioBuscado) {
            done(null, usuarioBuscado);
        } else {
            
            let user = await usuariosService.crearUsuario({
                first_name: profile['_json'].login || "Pendiente nombre",
                last_name: profile['_json'].html_url || "Pendiente apellido",
                email: email,
                password: hashear(profile['_json'].login),
                age: 2,
                rol: "User",
                cart: "Pendiente"
            });

            
            await usuariosRepository.crearUsuario(user)
            winstonLogger.debug("USUARIO CREADO CON EXITO: " + user)
            done(null, user);
        }
    } catch (error) {
        new Error('CREACION-FALLIDA')
        done(error);
    }
}));

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()
export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })



