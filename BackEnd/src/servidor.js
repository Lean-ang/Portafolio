import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
//CONFIGURACION
import { PORT } from './config/config.sv.js';
//ROUTERS
import { sessionsRouter } from './routes/sessionsRouter.js';
import { productsRouter } from './routes/productsRouter.js';
import { cartsRouter } from './routes/cartsRouter.js';
import { ticketsRouter } from './routes/ticketsRouter.js';
import { docsRouter } from './routes/docsRouter.js';
import { userRouter } from './routes/userRouter.js';
import { testsRouter } from './routes/testsRouter.js';
//MIDDLEWARES
import session from './middlewares/session.js';
import { manejadorDeErrores } from './middlewares/manejoDeErroresRest.js';
import { onlyAdmin, onlyLoggedin } from './middlewares/onlyLoggedin.js';
import { loggerPeticion } from './middlewares/winstonLogger.js';
import { passportInitialize, passportSession } from './middlewares/passport.js';
//CONTROLLERS
import { homeController } from './controllers/api/home.controller.js';
import { realTimeProductsController } from './controllers/api/realtimeproducts.controller.js';
import { chatController } from './controllers/web/chat.controller.js';
//ULTIS
import { winstonLogger } from './utils/winstonLogger.js';


const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars') 

app.use(session)

app.use(passportInitialize, passportSession) 
app.use(express.static('./public')) 
app.use(express.static('./static')) 
app.use(express.json()) 
app.use(loggerPeticion)

app.use('/api/products',onlyLoggedin, productsRouter)
app.use('/api/carts',onlyLoggedin, cartsRouter)
app.use('api/tickets',onlyLoggedin, ticketsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', userRouter)
app.use('/api/test', testsRouter)
app.use('/api/docs', docsRouter)


const httpServer = app.listen(PORT)
winstonLogger.info(`Servidor escuchando en puerto ${PORT}`)
export const io = new SocketIOServer(httpServer)

app.get('/', async (req, res) => {

    res.render('index', {
        titulo: 'Inicio',
        encabezado: 'Bienvenido al servidor'
    })
})

//PRODUCTOS
app.get('/realtimeproducts',onlyLoggedin,onlyAdmin, realTimeProductsController)
app.get('/home',onlyLoggedin, homeController)

//CHAT
app.get('/chat', onlyLoggedin,chatController)
app.get('*', (req,res)=>{
    res.redirect('/')
})

//MANEJADOR DE ERRORES
app.use(manejadorDeErrores)


