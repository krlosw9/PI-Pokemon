import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux' ;
import {searchPokemon, clearResponseToReques} from '../../redux/actions';
import style from './Input.module.css'
import '../generalStyles.css';

export default function Input() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const response = useSelector(store => store.responseToRequest)

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(searchPokemon(input));
    setInput('');
  }

  const handleChange = (e) =>{
    setInput(e.target.value);
    validate(e.target.value);
  }

  const validate = (value) =>{
    const expRegText = new RegExp(/^[a-zA-Z\s]{3,20}$/);//Expresion regular -> permite solo letras y longitud entre 3 y 20 caracteres

    if (value.length > 0) {
      if (!expRegText.test(value)) {
        setError('Solo se permite letras entre 3 y 20 caracteres.');
      }else{
        setError('');
      }
    }else{
      setError('');
    }
    if (response.hasOwnProperty('error')) {
      dispatch(clearResponseToReques());
    }
  }
  
  return(
    <form onSubmit={handleSubmit} className={style.formSearch}>
      <input 
        type="text" className={style.pokemonSearch} 
        placeholder="Nombre del pokemon a buscar"
        value={input} onChange={handleChange}
        autoFocus
      />
      {error && <p className='error-message'>{error}</p>}
      {response.hasOwnProperty('error') && <p className='error-message'>{response.error}</p>}
      <input type="submit" value="Buscar" className={style.btnSearch}/>
    </form>
  )
}