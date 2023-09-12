import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '0.1.1',
      title: 'Servidor API express',
      description:
        'Servidor de una API REST, creado con express y documentado con swagger',
      contact: { name: 'Leandro Angelico', email: 'leanangelico@outlook.com', url: 'https://github.com/Lean-ang/'} 
    },
  },
  apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)

export const docsRouter = Router()

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))

