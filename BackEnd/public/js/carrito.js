const btnBuy = document.getElementById("btnBuyCart")
btnBuy?.addEventListener("click", ()=>{
    // @ts-ignore
    const valorinputCartID = document.getElementById("inputCartID")?.value
    const url = window.location.origin; 
    const url2 = url + `/api/carts/${valorinputCartID}/purchase/` 
    window.location.href = url2
   
})

const btnDeleteProduct = document.getElementById("btnDeleteProduct")
btnDeleteProduct?.addEventListener("click", ()=>{
    
    // @ts-ignore
    const valorinputCartID = document.getElementById("inputCartID")?.value
 
    // @ts-ignore
    const valorInputProductoID = document.getElementById("inputDeleteProduct")?.value   
    const url = window.location.origin; 
    const url2 = url + `/api/carts/${valorinputCartID}/productoEliminar/${valorInputProductoID}/` 
    window.location.href = url2
    
})

const btnCLearCart = document.getElementById("btnClearCart")
btnCLearCart?.addEventListener("click", ()=>{
    // @ts-ignore
    const valorinputCartID = document.getElementById("inputCartID")?.value

    const url = window.location.origin; 
    const url2 = url + `/api/carts/${valorinputCartID}/vaciarCarrito/` 
    window.location.href = url2
        
})

const buyCart = document.getElementById("btnBuyCart")
buyCart?.addEventListener("click",()=>{
     // @ts-ignore
    const valorinputCartID = document.getElementById("inputCartID")?.value
    const url = window.location.origin; 
    const url2 = url + `/api/carts/${valorinputCartID}/purchase/` 
    window.location.href = url2
     
})

const returnProducts = document.getElementById("returnProducts")
returnProducts?.addEventListener("click",()=>{
    // @ts-ignore
    const rol = document.getElementById("inputRol").value
    if(rol==="Admin"){
        
        const url = window.location.origin; 
        const url2 = url + `/api/products/admin/` 
        window.location.href = url2
        } else {
            const url = window.location.origin; 
            const url2 = url + `/home/` 
            window.location.href = url2
          }
})
