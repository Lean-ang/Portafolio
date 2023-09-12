import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  name: { type: String },
  reference: { type: String }
})

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  rol: {enum: ['Admin', 'User', 'Developer','Mod'], type: String},
  cart: { type: String},
  documents: [documentSchema], 
  last_connection: { type: String},
}, { versionKey: false })

export const usuarioModel = mongoose.model('usuarios', usuarioSchema)