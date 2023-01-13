import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Pagination.module.css';
import {getAll} from '../../../redux/actions';

export default function Pagination(props){
  const [page, setPage] = useState(1);
  const PAGINATOR_SIZE = 12;
  const allPokemons = useSelector(store => store.allPokemon)
  const dispatch = useDispatch();

  const refreshPokemons = () => dispatch(getAll());

  //esta funcion regresa un boleano que indica si, se desactiva el paginador next
  const limitPage = () => (page * PAGINATOR_SIZE) >= allPokemons.length;
  
  useEffect(() => {
    if (allPokemons.length) {
      if (allPokemons.length < PAGINATOR_SIZE && page > 1) {
        //Si el usuario esta en la pagina 4 y luego decide hacer un filtro, debemos reiniciar el page a 1
        setPage(1);
      }
      const offset = (page-1) * PAGINATOR_SIZE;
      const limit = offset + PAGINATOR_SIZE;
      //Enviamos al componente PokemonCards una copia de allPokemons, esta copia tiene la cantidad de PAGINATOR_SIZE, y va desde el pokemon en la posicion en offset hasta uno antes de limit
      
      props.setPaginatedPokemon(allPokemons.slice(offset, limit));
    }else{
      props.setPaginatedPokemon([]);//Si algun filtro da un array vacio, entonces PokemonCards debe resolver ese array vacio
    }
  }, [page, allPokemons]);

  const handlePrev = () =>{
    
    setPage(page-1);
  }

  const handleNext = () =>{
    setPage(page+1);
  }
  return (
    //Esto es para que no salga el paginador cuando se hace la busqueda de pokemon por el componente Input
    allPokemons.length < PAGINATOR_SIZE 
      ?
        <div><button onClick={() => refreshPokemons()}>Regresar</button></div>
      : 

      <div>
          <button className={style.prev} onClick={handlePrev} 
            disabled={page === 1}>Anterior</ button>
          <p>{page}</p>
          <button className={style.next} onClick={handleNext} disabled={limitPage()}>Siguiente</button>
      </div> 
  )
 
}