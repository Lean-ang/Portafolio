
import { memo } from "react"
import { Link } from "react-router-dom"
import "./Item.css"

const Item = memo( ({ product }) => {  
        return (
            <div className='col-md-3 cards container-fluid' key={product.id}>   
                <Link to={`/detail/${product.id}`} >                  
                    <div className="card w-100 mt-5" >
                        <div className="card-header card-title text-center titulo">
                            {`${product.name}`}
                        </div>
                        <div className="card-body text-center">
                            <img src={product.foto} alt='foto' className='w-50' />
                            <div className="text-center"><h3>${product.price}</h3> </div>  
                            <br />
                            <button className="boton">Detalles</button>                                                         
                        </div>
                    </div>      
                </Link>                          
            </div>   
  )
    }
)

export default Item