import './PokemonCards.css'
import Card from './Card/Card';

export default function PokemonCard(props) {
  if (!props.pokemons.length) return <h3>No hay pokemon</h3>
  return(
    <div className='container-pokemons'>
      {
        props.pokemons.map( poke => (
            <Card 
              key={poke.id}
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