import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa";


export const ItemCount = ( { stock=4 , inital=1 ,onAdd }) => {
    const [ count, setCount ] = useState(inital) 

    const sumar = () => {
         if(count < stock) {
            setCount(count + 1)            
        } 
    }
    const restar = () => {if(count > inital) setCount(count - 1)}            
    const añadir = () => onAdd(count)
    
    return (
        <center>
            <button 
                className="boton" 
                onClick={restar} 
            > 
                <FaMinus/>
            </button>     
            <label htmlFor="">{count}</label>
        
            <button 
                className="boton" 
                onClick={sumar} 
            > 
                <FaPlus/> 
            </button> 
            <br />    
            <button 
                className="boton" 
                onClick={ añadir } 
            > 
                Agregar al carrito 
            </button>     
            <br></br>
            
    </center>
    )
}