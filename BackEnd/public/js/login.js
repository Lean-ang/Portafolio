
const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
    formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const inputEmailLogin = document.querySelector('#inputEmailLogin')
    const inputPasswordLogin = document.querySelector('#inputPasswordLogin')
    
    if (
        inputEmailLogin instanceof HTMLInputElement &&
    inputPasswordLogin instanceof HTMLInputElement  
      
    ){ 
        const loginUsuario = {email: inputEmailLogin.value,password:inputPasswordLogin.value}
 
const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginUsuario)
  });
  
  if (!response.ok) {
    throw new Error('SERVER-COMUNICATION-ERROR');
  }

  const usuarioLogeado = await response.json();

      if(response.ok) {
        const url = window.location.origin; 
        const url2 = url + "/api/sessions/current" 
        window.location.href = url2
       
      }
    }

  })


}
