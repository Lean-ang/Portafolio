import dotenv from 'dotenv'

dotenv.config({
  path: 'env.config'
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const entorno = process.env


export default entorno

export const variableEntorno = entorno.NODE_ENV || 'development'