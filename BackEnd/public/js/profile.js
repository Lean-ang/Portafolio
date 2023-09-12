
const btnLogout = document.getElementById('btnLogout')
if (btnLogout) {
    btnLogout.addEventListener('click', async (e) => {
      e.preventDefault()
  
      const { status } = await fetch('/api/users/login', {
        method: 'DELETE'
      })
  
      if (status === 200) {

        const url = window.location.origin; 
        const url2 = url + `/api/sessions/login` 
        window.location.href = url2
      } else {
        console.log('[logout] estado inesperado: ' + status)
      }
  
    })
  }


  const btnResPassword = document.getElementById("btnResPassword")

btnResPassword?.addEventListener("click", (e)=>{
  e.preventDefault()

  const url = window.location.origin; 
  const url2 = url + `/api/sessions/reestablecer` 
  window.location.href = url2
})

const btnLoadJson = document.getElementById("btnLoadJSON")
// Usar el evento DOMContentLoaded para ejecutar el script cuando el documento esté listo
btnLoadJson?.addEventListener('click', function() {
  
    const url = window.location.origin; 
    const url2 = url + `/api/users/mod/documents/` 
    window.location.href = url2
  })