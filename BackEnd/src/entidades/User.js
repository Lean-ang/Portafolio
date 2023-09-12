function validarMail(str) {
    // Comprobar si el string tiene . y @ usando el método includes
    return str.includes(".") && str.includes("@");
  }
  
  function soloLetras(palabra) {
    let letras = /^[a-zA-Z]+$/;
    return letras.test(palabra); 
  }
  
export class User {
    constructor({ first_name, last_name, email, password, age, rol,cart}) {
      try {
      
         if (!first_name||!last_name||!age||!email||!password) {
             throw new Error('Campo-vacio')
           }
           
                
         if (!soloLetras(first_name)||!soloLetras(last_name)||!validarMail(email)) {
           throw new Error('Campo-con-valor-invalido')
          }
               
         this.first_name = first_name;
         this.last_name = last_name;
         this.email=email;
         this.password = password;
         this.age = age;
         this.rol = rol;
         this.cart = cart;
         this.documents = [{name: "", reference: ""}];
         this.last_connection = new Date().toLocaleString();

      } catch (error) {
        throw Error(error.message)
      }
  }
}
