import {useSelector} from 'react-redux'
import './PokemonCards.css'
import Card from './Card/Card';
import NotFound from '../NotFound/NotFound';

export default function PokemonCard(props) {
  const allPokemon = useSelector(store => store.allPokemon)

  if (!allPokemon.length) return <NotFound/>
  return(
    <div className='container-pokemons'>
      {!allPokemon.length ? <NotFound/> 
        :  allPokemon.map( poke => (
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
  )
}