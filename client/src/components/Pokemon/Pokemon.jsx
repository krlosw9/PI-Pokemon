import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getAll} from "../../redux/actions";
import PokemonCards from '../PokemonCards/PokemonCards';

export default function Home() {
  const allPokemon = useSelector(store => store.allPokemon)
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getAll())
  });

  return (
      <PokemonCards pokemons={allPokemon}/>
  )
}