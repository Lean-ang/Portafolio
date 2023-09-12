import { useCartContext } from '../../context/CartContext'
import { VscTrash } from "react-icons/vsc"

const Cart = ({product}) => {

  const { deleteItem } = useCartContext()
  
  return (
    <div className='card w-75 mt-5'>
      <div className='card-header text-center'>
          <h2>{product.name}</h2>
      </div>
      <div className='card-body text-center'>
          <img src={product.foto} alt="foto-carrito" className="w-25 text-center"/>
             <h5 className="">Cantidad: {product.quantity}</h5>
             <h5 className="">Precio: ${product.quantity * product.price }</h5>
      </div>
      <button onClick={() => deleteItem(product.id)} ><VscTrash/></button>
    </div>
     )
    }
   
 
 

  
export default Cart