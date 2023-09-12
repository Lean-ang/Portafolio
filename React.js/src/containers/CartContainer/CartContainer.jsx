import { useCartContext } from "../../context/CartContext"
import CartList from "../../components/CartList/CartList"
import NoProducts from "../../components/NoProducts/NoProducts"
import FormList from "../../components/FormList/FormList"
import './CartContainer.css'



const CartContainer = () => {

  const { totalPrice, totalQuantity } = useCartContext();
  

  return (
    <>
      <div className="container">  
        {totalQuantity() > 0 ?
        <> 
          <CartList />
          
          <div className="d-flex justify-content-center">
            <p className="txt">El total de su compra es de ${totalPrice()}</p>
          </div>

          <FormList />
        </>
        : <NoProducts />
        }

      </div>
    </>
  )
}

export default CartContainer