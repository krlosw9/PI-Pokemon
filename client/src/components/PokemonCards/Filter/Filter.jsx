import { useDispatch, useSelector } from "react-redux";
import {filterPokemonType} from '../../../redux/actions';

export default function Filter() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);

  const handleFilterPokemonType = (pokemonType) =>{
    dispatch(filterPokemonType(pokemonType));
  }

  return (
    <div>
      <div>
        <p>Filtrar por:</p>

        <div>
          <select onChange={(e) => handleFilterPokemonType(e.target.value)}>
            <option value='sinFiltro'>Tipo de pokemon</option>
            {
              allTypes.map(type => <option key={type.id} value={type.name}>{type.name}</option>)
            }
          </select>

          <select name="" id="">
            <option value="">¿Pokemon creado o existente?</option>
            <option value="">Creado</option>
            <option value="">Existente</option>
          </select>
        </div>
      </div>

      <div>
        <p>Ordenar por:</p>

        <div>
          <select>
            <option value="up">Nombre ascendente</option>
            <option value="down">nombre descendente</option>
          </select>

          <select name="" id="">
            <option value="">Ataque ascendente</option>
            <option value="">Ataque descendente</option>
          </select>
        </div>
      </div>
    </div>
  )
}