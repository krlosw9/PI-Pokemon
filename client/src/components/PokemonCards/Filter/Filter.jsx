import { useDispatch, useSelector } from "react-redux";
import {filterPokemonType, filterPokemonApi} from '../../../redux/actions';

export default function Filter() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);

  const handleFilterPokemonType = (pokemonType) =>{
    dispatch(filterPokemonType(pokemonType));
  }

  const handleFilterPokemonApi = (api) =>{
    dispatch(filterPokemonApi(api));
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

          <select onChange={(e) => handleFilterPokemonApi(e.target.value)}>
            <option value="sinFiltro">¿Pokemon creado o existente?</option>
            <option value={false}>Creado</option>{/* Creado es false porque no viene de la api */}
            <option value={true}>Existente</option> {/* Existente es true porque si viene de la api */}
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