import FormButton from "../FormButton/FormButton";
import './Form.css'


const Form = ({ endBuy, handleOnChange, dataForm }) => {

  return (
   <div>
    <form onSubmit={endBuy} id="form">
      <div className="inputForm">
       <div>
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            className="formControl"
            name="name"
            value={dataForm.name}
            placeholder="Nombre"
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="text" 
            className="formControl"
            name="email"
            value={dataForm.email}
            placeholder="email"
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email2">Confirmar email:</label>
          <input 
            type="text" 
            className="formControl"
            name="email2"
            value={dataForm.email2}
            placeholder="confirmar email"
            onChange={handleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Celular:</label>
          <input 
            type="number" 
            className="formControl"
            name="phone"
            value={dataForm.phone}
            placeholder="celular"
            onChange={handleOnChange}
            required
          />  
        </div>      
      </div>  
      <br />
      <div className="mb-5 container-fluid text-center">
           <FormButton />
     </div>      
    </form>       
  </div>  
  ) 
}


export default Form