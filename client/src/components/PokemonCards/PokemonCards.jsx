import './PokemonCards.css'
import Card from './Card/Card';

export default function PokemonCard(props) {
  if (!props.pokemons) return <h1>No hay pokemon</h1>
  return(
    <div className='container-pokemons'>
      {
        props.pokemons.map( poke => (
          <Card key={poke.id} img={poke.img} name={poke.name}/>
        ) )
      }
    </div>
  )
}