import { useState } from "react"
import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { ItemCount } from "../ItemCount/ItemCount"
import "./ItemDetail.css"

const ItemDetail = ({ product }) => {
    const [ isCount, setIsCount ] = useState(true)
    
    const { addToCart } =  useCartContext()

    const onAdd= (quantity) => {
        addToCart( { ...product, quantity } )
        setIsCount(false)
    }

    return (
    <div> 
          <h2 className="titulo text-center">Detalles del Producto</h2>      
        <div>
            <div className="col-md-3 cards container-fluid">
              <div className="card w-100 mt-5">
                <div className="card-header card-title text-center titulo">
                   {product.name} 
                </div>
                   <div className="card-body text-center">
                       <img src={product.foto} className='w-75' alt="imágen del producto" />
                       <div>
                          <h4>{product.descripcion}</h4>
                       </div>
                      <div>
                        <h3>${product.price}</h3> 
                      </div>
                        <div>
                         <h5>Disponibilidad: {product.stock}</h5> 
                        </div>
                    </div>
               </div>    
            </div>  
            <br />
            <div>

              { isCount ?
                  
                  <ItemCount 
                     inintial={1}
                     onAdd={onAdd}
                    />
                    :  
                    
                   <>
                     <Link to='/cart'>
                         <button className="btn btn-success container d-flex justify-content-center">Ir al carrito</button>
                     </Link>
                     <Link to='/'>
                         <button className="btn btn-info container d-flex justify-content-center">Seguir Comprando</button>
                     </Link>
                   </>
                         }
           </div>  
        </div> 
     </div>        
    )
}

export default ItemDetail