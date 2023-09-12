
import { memo } from "react"
import Item from "../Item/Item"

const ItemList =  ({ products }) => {
   
    return (
  
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }} key={products.id}>
        { products.map( product =><Item product={product} />)}
  
      </div>  
    )
  }

export default ItemList
