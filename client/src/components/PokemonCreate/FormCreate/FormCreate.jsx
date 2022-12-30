import { useState } from 'react';
import style from './FormCreate.module.css';

export default function FormCreate({allTypes, formDispatch, response}) {
  const arrayTypes = Object.values(allTypes);
  const inputInitialState = {
    name: '',
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0
  };
  const [input, setInput] = useState(inputInitialState);
  const [error, setError] = useState({name: ''});//Inicializo el estado de error, para que al cargar el componente este desabilitado el boton de submit

  
  const handleChange = (e)=>{
    setInput({...input, [e.target.id]: e.target.value })//al estado input le paso todo lo que tenia dentro y lo que el usuario esta tipeando actualmente.

    setError( validate( {...input, [e.target.id]: e.target.value} )) //al setError le paso el objeto de errores que me regresa la funcion validate() y a validate le paso el estado input completo.
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    formDispatch(input);
    setInput(inputInitialState);//Limpio los input, luego de registrar
  }

  // Esto evalua si el estado de errores tiene errores, mientras tenga errores, estara desactivado el boton de enviar, (esta funcion retorna true o false)
  const disableButton = () => Object.keys(error).length > 0;

  const validate = (objInput) =>{
    let errorsValidate = {};
    const expRegText = new RegExp(/^[a-zA-Z\s]{3,20}$/);//Expresion regular -> permite solo letras y longitud entre 3 y 20 caracteres
    const expRegNumber = new RegExp(/^[0-9]{0,3}([.])?([0-9]{0,1})?$/)//Expresion regular -> permite solo numeros -> 1234 o 12.2

    if (!objInput.name) {
      errorsValidate.name = 'El nombre es requerido.';
    }else if(!expRegText.test(objInput.name)){
      errorsValidate.name = "Solo se permite letras entre 3 y 20 caracteres.";
    }else if(!expRegNumber.test(objInput.height)){
      errorsValidate.height = "Solo se permiten numeros, longitud maxima 4 cifras."
    }else if(!expRegNumber.test(objInput.weight)){
      errorsValidate.weight = "Solo se permiten numeros, longitud maxima 4 cifras."
    }else if(!expRegNumber.test(objInput.hp)){
      errorsValidate.hp = "Solo se permiten numeros, longitud maxima 4 cifras."
    }else if(!expRegNumber.test(objInput.attack)){
      errorsValidate.attack = "Solo se permiten numeros, longitud maxima 4 cifras."
    }else if(!expRegNumber.test(objInput.defense)){
      errorsValidate.defense = "Solo se permiten numeros, longitud maxima 4 cifras."
    }else if(!expRegNumber.test(objInput.speed)){
      errorsValidate.speed = "Solo se permiten numeros, longitud maxima 4 cifras."
    }
  
    return errorsValidate;
  }

  return(
    <form className={style.formContainer}>
      <div>
        <input type="submit" value='Registrar pokemon' onClick={(e) => handleSubmit(e)} disabled={disableButton()}/>
      </div>
      {Object.keys(response).length > 0 && response.success && <p className={style.successMessage}>Pokemon registrado</p>}
      {Object.keys(response).length > 0 && response.error && <p className={style.errorMessage}>{response.error}</p>}
      
      {/* <img src="" alt=""/> */}
      {/* <label htmlFor="">Image: </label>
      <input type="image"/> */}
      <div>
        <p className={style.message}>Los campos con (*) son obligatorios.</p>
      </div>
      <div className={style.formGroup}>
        <label htmlFor="name">Nombre*:</label>
        <input id='name' type="text" name="name" 
          value={input.name} autoFocus 
          onChange={(e) => handleChange(e)} placeholder='Requerido'
        />
        {error.name && <p className={style.errorMessage}>{error.name}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="height">Alto:</label>
        <input type="number" id="height" 
          value={input.height === 0 ? '' : input.height} 
          onChange={(e) => handleChange(e)} placeholder="Opcional"
        />
        {error.height && <p className={style.errorMessage}>{error.height}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="weight">Ancho:</label>
        <input type="number" id="weight" 
          value={input.weight === 0 ? '' : input.weight} 
          onChange={(e) => handleChange(e)} placeholder="Opcional"
        />
        {error.weight && <p className={style.errorMessage}>{error.weight}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="hp">Vida:</label>
        <input type="number" id="hp" 
          value={input.hp === 0 ? '' : input.hp} onChange={(e) => 
          handleChange(e)} placeholder="Opcional"/>
        {error.hp && <p className={style.errorMessage}>{error.hp}</p>}
      </div>
      
      <div className={style.formGroup}>
        <label htmlFor="attack">Ataque:</label>
        <input type="number" id="attack" 
          value={input.attack === 0 ? '' : input.attack} 
          onChange={(e) => handleChange(e)} placeholder="Opcional"
        />
        {error.attack && <p className={style.errorMessage}>{error.attack}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="defense">Defensa:</label>
        <input type="number" id="defense" 
          value={input.defense === 0 ? '' : input.defense} 
          onChange={(e) => handleChange(e)} placeholder="Opcional"
        />
        {error.defense && <p className={style.errorMessage}>{error.defense}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="speed">Velocidad: </label>
        <input type="number" id="speed" 
          value={input.speed === 0 ? '' : input.speed} 
          onChange={(e) => handleChange(e)} placeholder="Opcional"
        />
        {error.speed && <p className={style.errorMessage}>{error.speed}</p>}
      </div>

      <div className={style.formGroup}>
        <label htmlFor="types">Tipos:</label>
        {arrayTypes.map(type => <p key={type.id}>{type.name}</p>)}
      </div>

      
    </form>
  )
}