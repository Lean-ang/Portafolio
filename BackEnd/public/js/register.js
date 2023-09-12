function validarMail(str) {
  // Comprobar si el string tiene . y @ usando el método includes
  return str.includes(".") && str.includes("@");
}

function soloLetras(palabra) {
  // Crear una expresión regular que acepte solo letras de la a a la z en mayúsculas o minúsculas
  let letras = /^[a-zA-Z]+$/;
  return letras.test(palabra); //true si coincide con la exp regular
}

const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const inputFirstName = document.querySelector('#inputFirstName')
    const inputLastName = document.querySelector('#inputLastName')
    const inputEmail = document.querySelector('#inputEmail')
    const inputAge = document.querySelector('#inputAge')
    const inputPassword = document.querySelector('#inputPassword')
    const inputRol = document.querySelector('#inputRol')
    // const input_cart = document.querySelector('#input_cart')

    if (
      inputFirstName instanceof HTMLInputElement &&
      inputLastName instanceof HTMLInputElement &&
      inputEmail instanceof HTMLInputElement &&
      inputAge instanceof HTMLInputElement &&
      inputPassword instanceof HTMLInputElement&&
      inputRol instanceof HTMLInputElement 
      // input_cart instanceof HTMLInputElement
    ) {


if(!soloLetras(inputFirstName.value)){alert('El nombre solo puede utilizar letras a-z')}
if(!soloLetras(inputLastName.value)){alert('El apellido solo puede utilizar letras a-z')}
if(!validarMail(inputEmail.value)){alert('El email debe tener formato usuario@servidor.dominio')}

      const userData = {
        first_name: inputFirstName.value,
        last_name: inputLastName.value,
        email: inputEmail.value,
        age: inputAge.value,
        password: inputPassword.value,
        rol: inputRol.value,
        // cart: input_cart.value,
      }

      
    if(userData.email=='adminCoder@coder.com'&& userData.password=="adminCod3r123"){
        userData.rol="Admin"
    }
      
const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error('NOT-FOUND');
  }
  
  const usuarioCreado = await response.json();

if (response.ok) {

  const url = window.location.origin; 
  const url2 = url + `/api/sessions/current` 
  window.location.href = url2
}
    }


  })
}
