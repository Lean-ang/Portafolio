import express, {Router} from 'express';
import { onlyAdmin, onlyLoggedin } from '../middlewares/onlyLoggedin.js';

import { ticketsController } from '../controllers/api/tickets.controller.js';
import { ticketDeleteController, ticketPutController } from '../controllers/api/ticket.controller.js';

export const ticketsRouter = Router()
ticketsRouter.use(express.json())
ticketsRouter.use(express.urlencoded({extended:true}))


ticketsRouter.get('/',onlyLoggedin,onlyAdmin, ticketsController)

ticketsRouter.delete('/', onlyLoggedin,onlyAdmin, ticketDeleteController)

ticketsRouter.put('/:tid', onlyLoggedin,onlyAdmin, ticketPutController)

