import { useCartContext } from "../../context/CartContext"
import { BsFillCartFill } from "react-icons/bs"
import "./CartWidget.css"

const CartWidget = () => {
  const { totalQuantity } = useCartContext()
  return (
      <div className="carrito">
          { totalQuantity() > 0 && totalQuantity() }
          <BsFillCartFill/>
      </div>
  )
}

export default CartWidget
