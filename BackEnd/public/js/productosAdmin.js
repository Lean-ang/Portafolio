
const btnUploadAdm = document.getElementById('btnUploadAdm')
const btnDeleteAdm = document.getElementById('btnDeleteAdm')
const deleteIdAdm = document.getElementById('deleteIdAdm')
const titleAdm = document.getElementById('titleAdm')
const descriptionAdm = document.getElementById('descriptionAdm')
const priceAdm = document.getElementById('priceAdm')
const urlIMGAdm = document.getElementById('urlIMGAdm')
const stockAdm = document.getElementById('stockAdm')
const codeAdm = document.getElementById('codeAdm')
const categoryAdm = document.getElementById('categoryAdm')
const statusTrueAdmin = document.getElementById('statusAdm')
const user = document.getElementById('userEmailInput')


btnDeleteAdm?.addEventListener("click",async (e)=>{
    e.preventDefault()
   // @ts-ignore
    const idEliminar = deleteIdAdm?.value
 
    const response = await fetch('/api/products/admin/' + idEliminar, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const productoEliminado = await response.json();
              
    if (response.ok) {
      location.reload()
    }

})

// @ts-ignore
btnUploadAdm?.addEventListener("click",async (e)=>{
    e.preventDefault()
    // @ts-ignore
    const valorTitulo= titleAdm?.value
    // @ts-ignore
    const valorDescripcion= descriptionAdm?.value
    // @ts-ignore
    const valorPrecio= parseInt(priceAdm?.value)
    // @ts-ignore
    const valorUrlIMG= urlIMGAdm?.value
    // @ts-ignore
    const valorStock= parseInt(stockAdm?.value)
    // @ts-ignore
    const valorCodigo= codeAdm?.value
    // @ts-ignore
    const valorCategoria= categoryAdm?.value
    // @ts-ignore
    const valorStatus= statusTrueAdmin?.value || true

    // @ts-ignore
    const valorUsuario = user?.value

    const addProduct = {"title":valorTitulo,"description":valorDescripcion,"price":valorPrecio,"thumbnail":valorUrlIMG,"stock":valorStock,"code":valorCodigo,"category":valorCategoria,"status":valorStatus,"owner":valorUsuario}

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },body:JSON.stringify(addProduct)
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const productAdded = await response.json();
              
    if (response.ok) {
      location.reload()
    }

})

const formAdmin = document.getElementById('formAdm')
if(formAdmin){
    formAdmin.addEventListener('submit', e=>{
        e.preventDefault()
    })
}

const btnViewProduct = document.getElementById("btnViewProduct") 
btnViewProduct?.addEventListener("click",async(e)=>{
    e.preventDefault()

    // @ts-ignore
    const valorIDVer = document.getElementById("inputViewProduct").value

    const url = window.location.origin; 
    const url2 = url + `/api/products/${valorIDVer}/` 
             
    window.location.href = url2

})
