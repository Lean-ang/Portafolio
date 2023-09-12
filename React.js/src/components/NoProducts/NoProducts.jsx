import { Link } from "react-router-dom"
import './NoProducts.css'

const NoProducts = () => {
  return (
    <div className="conatiner-fluid text-center">
        <h1 className="mt-5">No hay productos</h1>
        <Link to="/">
          <button className="mt-5 boton">
            Inicio
          </button>
        </Link>
    </div>
  )
}

export default NoProducts

