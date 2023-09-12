import { useCartContext } from '../../context/CartContext'
import Cart from '../Cart/Cart'
import "./CartList.css"

const CartList = () => {

    const { cartList } = useCartContext()

    return (
      <div className='d-flex justify-content-center txt'>
        {cartList.map((product) => 
          <Cart 
            key={product.id}
            product={product}
          />
        )}
      </div>
    )
}


export default CartList