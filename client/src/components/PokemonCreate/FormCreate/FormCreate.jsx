import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './FormCreate.module.css';
import FormType from './FormType/FormType';
import { createPokemon, clearResponseToReques, createType } from "../../../redux/actions";

export default function FormCreate() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);
  const response = useSelector(store => store.responseToRequest)

  const inputInitialState = {
    name: '',
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    img: ''
  };
  const [input, setInput] = useState(inputInitialState);
  const [checked, setChecked] = useState([]);//Se inicializa el array que tendra los id de los Type, cada checkbox checked estara en este array
  const [error, setError] = useState({ name: '' });//Inicializo el estado de error, para que al cargar el componente este desabilitado el boton de submit

  //Funciones que se envian a los componentes hijos, para despachar la accion que envia el Post
  const registerType = (request) => dispatch(createType(request));//

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })//al estado input le paso todo lo que tenia dentro y lo que el usuario esta tipeando actualmente.

    setError(validate({ ...input, [e.target.id]: e.target.value })) //al setError le paso el objeto de errores que me regresa la funcion validate() y a validate le paso el estado input completo.
  }

  //Maneja los cambios en los checkbox
  const onChange = (id) => {
    const selectedCheckboxes = checked; //Array temporal, con los id de los type que actualmente estan checked

    const findIdx = selectedCheckboxes.indexOf(id);

    //El id que se recibe por parametro es el id del checkbox que se esta modificando
    //Index -1 significa que no esta en el array, entonces toca pushearlo
    // Index > -1 -> si esto ocurre es porque indexOf encontro el id y retorna el index, con este index sacamos del array el id
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    setChecked(selectedCheckboxes);
  };

  const isChecked = (id) =>{
    return checked.includes(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPokemon({...input, types: checked}));
    setInput(inputInitialState);//Limpio los input, luego de registrar
  }

  // Esto evalua si el estado de errores tiene errores, mientras tenga errores, estara desactivado el boton de enviar, (esta funcion retorna true o false)
  const disableButton = () => Object.keys(error).length > 0;

  const validate = (objInput) => {
    let errorsValidate = {};
    const expRegText = new RegExp(/^[a-zA-Z\s]{3,20}$/);//Expresion regular -> permite solo letras y longitud entre 3 y 20 caracteres
    const expRegNumber = new RegExp(/^[0-9]{0,3}([.])?([0-9]{0,1})?$/)//Expresion regular -> permite solo numeros -> 1234 o 12.2

    if (!objInput.name) {
      errorsValidate.name = 'El nombre es requerido.';
    } else if (!expRegText.test(objInput.name)) {
      errorsValidate.name = "Solo se permite letras entre 3 y 20 caracteres.";
    } else if (!expRegNumber.test(objInput.height)) {
      errorsValidate.height = "Solo se permiten numeros, longitud maxima 4 cifras."
    } else if (!expRegNumber.test(objInput.weight)) {
      errorsValidate.weight = "Solo se permiten numeros, longitud maxima 4 cifras."
    } else if (!expRegNumber.test(objInput.hp)) {
      errorsValidate.hp = "Solo se permiten numeros, longitud maxima 4 cifras."
    } else if (!expRegNumber.test(objInput.attack)) {
      errorsValidate.attack = "Solo se permiten numeros, longitud maxima 4 cifras."
    } else if (!expRegNumber.test(objInput.defense)) {
      errorsValidate.defense = "Solo se permiten numeros, longitud maxima 4 cifras."
    } else if (!expRegNumber.test(objInput.speed)) {
      errorsValidate.speed = "Solo se permiten numeros, longitud maxima 4 cifras."
    }

    if (Object.keys(response).length > 0) {
      dispatch(clearResponseToReques());
    }

    return errorsValidate;
  }

  return (
    
    <div>
      <form className={style.formContainer}>
        <div>
          <input type="submit" value='Registrar pokemon' onClick={(e) => handleSubmit(e)} disabled={disableButton()} />
        </div>
        {Object.keys(response).length > 0 && response.success && <p className={style.successMessage}>Pokemon registrado</p>}
        {Object.keys(response).length > 0 && response.error && <p className={style.errorMessage}>{response.error}</p>}

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
              handleChange(e)} placeholder="Opcional" />
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
          <label htmlFor="imgimage">Imagen:</label>
          <input id='img' type="text" name="img"
            value={input.img}
            onChange={(e) => handleChange(e)} placeholder='Url de la imagen'
          />
          {/* {error.img && <p className={style.errorMessage}>{error.img}</p>} */}
        </div>
        
        {/* Checkbox Type */}
        <div>
          <p>Tipos de pokemon:</p>
          {allTypes.map(pokeType => (
            <div key={pokeType.id}>
              <label htmlFor={`check-${pokeType.id}`}>
                {pokeType.name}
              </label>
              <input
                type="checkbox"
                id={`check-${pokeType.id}`}
                onChange={() => onChange(pokeType.id)}
                defaultChecked={isChecked(pokeType.id)}//Includes retorna true o false
              />
            </div>
          ))}
        </div>
      </form>
      <FormType registerType={registerType} />
    </div>
  )
}