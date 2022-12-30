import { useState } from 'react';
//import style from './FormType.module.css';
import style from '../FormCreate.module.css';

export default function FormType({registerType}) {
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>{
    setType(e.target.value);
    setError(validate(e.target.value));
  }

  const disableButton = () => !type || !!error; //Si el tipe esta vacio o tiene algun error de validacion, deshabilita el boton y no permite el envio del formulario

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!disableButton()) {
      registerType({name: type});
      setType('');//Limpio el input luego de reistrar el type
    }
  }

  const validate = (typeInput) =>{
    let errorValidate = null;
    const expRegText = new RegExp(/^[a-zA-Z\s]{3,20}$/);//Expresion regular -> permite solo letras y longitud entre 3 y 20 caracteres

    if(!expRegText.test(typeInput)){
      errorValidate = 'Solo se permite letras entre 3 y 20 caracteres.';
    }

    return errorValidate;
  }

  return(
    <form>
      <div className={style.formGroup}>
        <label htmlFor="type">Nuevo tipo:</label>
        <input type="text" id='type' value={type} onChange={(e) => handleChange(e)}/>
        {error && <p className={style.errorMessage}>{error}</p>}
      </div>
      <div>
        <button className='btnType' onClick={(e) => handleSubmit(e)} disabled={disableButton()}> + </button>
      </div>
    </form>
  )
}