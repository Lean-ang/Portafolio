import { useState, createContext, useContext } from "react";

const CartContext = createContext([])


// CART CONTEXT OBJECT
export const useCartContext = () => useContext(CartContext)


// INCORPORANDO PRODUCTOS A CARTLIST
export const CartContextProvider = ({ children }) => {
    const [cartList, setCartList]=useState([])

    const addToCart = (product) => {

        const idx = cartList.findIndex(prod => prod.id === product.id)

        if (idx === -1) {
            setCartList([
                ...cartList,
                product
            ])
        } else {
            cartList[idx].quantity += product.quantity
            setCartList ([...cartList])
        }
    }

    // VACIAR CARRITO
    const cleanCart = () => setCartList([])

    // PRECIO TOTAL
    const totalPrice = () => cartList.reduce((count, product) => count += (product.quantity * product.price), 0)

    // CANTIDAD TOTAL
    const totalQuantity = () => cartList.reduce((count, product) => count += product.quantity, 0)

    // ELIMINAR ITEM
    const deleteItem = (id) => setCartList(cartList.filter(product => product.id != id))


  return (
    <CartContext.Provider value={{
        cartList,
        addToCart,
        cleanCart,
        totalQuantity,
        totalPrice,
        deleteItem,
    }}>
        { children }
    </CartContext.Provider>
  )
}