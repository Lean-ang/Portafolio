import { useEffect, useState } from "react"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { useParams } from "react-router-dom"
import ItemDetail from "../../components/ItemDetail/ItemDetail"
import Loading from "../../components/Loader/Loader"

const ItemDetailContainer = () => {
    const [ product, setProduct] = useState({})
    const [ loading, setLoading] = useState(true)
    const { productoId } = useParams()
    
    useEffect(()=>{
        const db = getFirestore()
        const queryDoc = doc(db, 'productos', productoId)
        
        getDoc(queryDoc)
        .then(respuesta => setProduct(  { id: respuesta.id, ...respuesta.data() } ))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [])
    
    return (
        <>
            { loading ? <Loading /> 
            :  
                <ItemDetail
                    product={product}
                />
            }
        </>
    )
}

export default ItemDetailContainer

