
const formProductSelect = document.getElementById("formProductSelect")
formProductSelect?.addEventListener("submit",e=>e.preventDefault())

const btnAddSelectedProduct = document.getElementById("btnAddSelectedProduct")
btnAddSelectedProduct?.addEventListener("click",async ()=>{
    // @ts-ignore
    const idCart = document.getElementById("addToCart").value
    // @ts-ignore
    const idProduct = document.getElementById("addProductId").value
    const urlOrigin = window.location.origin; 
    const urlOrigin2 = urlOrigin + `/api/carts/${idCart}/product/${idProduct}` 
   
    try {
      const response = await fetch(urlOrigin2, {
        method: "POST",
      });
      const data = await response.json(); 
      const url1 = window.location.origin; 
      const url2 = url1 + `/api/carts/${idCart}` 
               
      window.location.href = url2;

    } catch (error) {
      console.error(error);
    }
})

const backToProducts = document.getElementById("backToProducts")
backToProducts?.addEventListener("click",()=>{
   
    // @ts-ignore
    const rol = document.getElementById("rol").value
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
