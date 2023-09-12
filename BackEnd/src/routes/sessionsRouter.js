import express, {Router} from 'express';
import { profileView } from '../controllers/web/perfil.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';
import session from '../middlewares/session.js';
import { authRouter } from './authRouter.js';
import { userRouter } from './userRouter.js';
import { antenticacionPorGithub_CB, autenticacionPorGithub, passportInitialize, passportSession } from '../middlewares/passport.js';
import { onlyLoggedin } from '../middlewares/onlyLoggedin.js';
import { reestablecerView } from '../controllers/web/reestablecer.controller.js';
import { sesionesLoginController } from '../controllers/api/products/sesiones.login.controller.js';

export const sessionsRouter = Router()
sessionsRouter.use(session)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({extended:true}))
sessionsRouter.use(passportInitialize, passportSession)
sessionsRouter.use('/auth', authRouter)
sessionsRouter.use('/users', userRouter)
sessionsRouter.get('/', async (req, res) => {
    res.render('sessions.handlebars', {})
    
})

sessionsRouter.get('/register',registroView)

sessionsRouter.get('/current',onlyLoggedin,profileView)

sessionsRouter.get('/reestablecer',reestablecerView)

sessionsRouter.get('/login',sesionesLoginController)

sessionsRouter.get('/github', autenticacionPorGithub)

sessionsRouter.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/api/sessions/current') })

    
