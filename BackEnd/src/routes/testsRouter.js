import { Router } from 'express';
import { onlyAdmin, onlyLoggedin } from '../middlewares/onlyLoggedin.js';
import { mockingController } from '../controllers/mocking.controller.js';
import { loggerController } from '../controllers/web/logger.controller.js';

export const testsRouter = Router()

// MOCKING
testsRouter.get('/mockingproducts',onlyLoggedin,onlyAdmin, mockingController);

//LOGGER
testsRouter.get('/loggerTest', onlyLoggedin,loggerController)