import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import './FormButton.css'


const FormButton = () => {

    const { cleanCart } = useCartContext();

  return (
    <div className="">
        <button className="boton">Finalizar compra</button>
        
        <button onClick={cleanCart} className="boton fluid-container text-center">vaciar carrito</button>
        
            <Link to='/'>
               <button className="boton fluid-container text-center">Volver al Inicio</button>
            </Link>
          
    </div>
  )
}

export default FormButton