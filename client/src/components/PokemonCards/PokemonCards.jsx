import style from './PokemonCards.module.css'
import Card from './Card/Card';
import NotFound from '../NotFound/NotFound';
import Pagination from './Pagination/Pagination';
import { useState } from 'react';
import Filter from './Filter/Filter';

export default function PokemonCard() {
  const [paginatedPokemon, setPaginatedPokemon] = useState([]);
  
  return(
    <div className={style.mainContainer}>
      <Filter />
      <div className={style.containerCards}>
        {!paginatedPokemon || !paginatedPokemon.length ? <NotFound/> 
          :  paginatedPokemon.map( poke => (
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
      <Pagination setPaginatedPokemon={setPaginatedPokemon}/>
    </div>
  )
}