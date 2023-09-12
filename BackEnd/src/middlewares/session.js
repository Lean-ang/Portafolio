import MongoStore from 'connect-mongo'
import session from 'express-session'
import { MONGODB_PATH } from '../config/config.mongo.js'
import { SESSION_SECRET } from '../config/session.config.js'

export default session({
  store: MongoStore.create({ mongoUrl: MONGODB_PATH }),
  saveUninitialized: false, //solo se guarda la sesion si tiene datos 
  resave: false, //para algunas librerias
  secret: SESSION_SECRET
})

