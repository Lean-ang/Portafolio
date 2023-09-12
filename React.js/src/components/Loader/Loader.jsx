import { useEffect } from "react"

const Loading =()=>{
   
    useEffect(()=>{

        return () => console.log('Dismounting..')
    })
    return (
        <>
            <h2>Cargando productos ...</h2>  
        </>
    )
}

export default Loading