import {useSelector} from 'react-redux'
import './PokemonCards.css'
import Card from './Card/Card';
import NotFound from '../NotFound/NotFound';
import Pagination from './Pagination/Pagination';

export default function PokemonCard() {
  const pokemons = useSelector(store => store.allPokemon)

  return(
    <div>
      <div className='container-pokemons'>
        {!pokemons || !pokemons.length ? <NotFound/> 
          :  pokemons.map( poke => (
              <Card 
                key={poke.api ? `api-${poke.id}` : `db-${poke.id}`}
                img={poke.img} 
                name={poke.name}
                types={poke.types}
                id={poke.api ? `api-${poke.id}` : `db-${poke.id}`}
              />
          ) )
        }
      </div>
      <Pagination />
    </div>
  )
}