import { useState, useEffect } from 'react'
import ItemList from '../../components/ItemList/ItemList'
import Loading from '../../components/Loader/Loader'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import "./style.css"


const ItemListContainer = ({Bienvenida}) => {
    const [ products, setProducts ] =   useState([])
    const [ loading, setLoading ] = useState(true)
    const { categoriaId } = useParams()

    useEffect(()=>{
        const db = getFirestore()
        const queryCollection = collection(db, 'productos')
        const queryFiltrada = categoriaId ? query(queryCollection, where("categoria","==",categoriaId)) : queryCollection

        getDocs(queryFiltrada)
        .then(respuesta => setProducts(  respuesta.docs.map(product => ({ id: product.id, ...product.data() }) ) ))
        .catch(err => console.log(err))
        .finally(()=> setLoading(false))
    }, [categoriaId])
  
  return (
    <>
      <h2 className="text-center titulo">{ Bienvenida }</h2>  
        { loading ? 
            <Loading />
                :
            <ItemList  products={products} />
        }    
    </>
  )
}

export default ItemListContainer

















     