import { useDispatch, useSelector } from "react-redux";
import {filterPokemonType, filterPokemonApi, orderByName, orderByAttack} 
  from '../../../redux/actions';
import style from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);

  //Funciones que despachan el filtro o orden
  const handleFilterPokemonType = (pokemonType) => dispatch(filterPokemonType(pokemonType));
  const handleFilterPokemonApi = (api) => dispatch(filterPokemonApi(api));
  const handleOrderByName = (orientation) => dispatch(orderByName(orientation));
  const handleOrderByAttack = (orientation) => dispatch(orderByAttack(orientation));

  return (
    <div className={style.mainContainer}>
      <div>
        <p>Filtrar por:</p>

        <div className={style.filterSelect}>
          <select onChange={(e) => handleFilterPokemonType(e.target.value)}>
            <option value='sinFiltro'>Tipo de pokemon</option>
            {
              allTypes.map(type => <option key={type.id} value={type.name}>{type.name}</option>)
            }
          </select>

          <select onChange={(e) => handleFilterPokemonApi(e.target.value)}>
            <option value="sinFiltro">¿Pokemon creado o existente?</option>
            <option value={false}>Creado</option>{/* Creado es false porque no viene de la api */}
            <option value={true}>Existente</option> {/* Existente es true porque si viene de la api */}
          </select>
        </div>
      </div>

      <div>
        <p>Ordenar por:</p>

        <div className={style.orderSelect}>
          <select onChange={(e) => handleOrderByName(e.target.value)}>
          <option value="sinFiltro">Nombre</option>
            <option value="up">Nombre A-Z</option>
            <option value="down">Nombre Z-A</option>
          </select>

          <select onChange={(e) => handleOrderByAttack(e.target.value)}>
            <option value="sinFiltro">Ataque</option>
            <option value="up">Ataque ascendente</option>
            <option value="down">Ataque descendente</option>
          </select>
        </div>
      </div>
    </div>
  )
}