import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {getAll} from "../../redux/actions";
import Input from "../Input/Input";
import PokemonCards from '../PokemonCards/PokemonCards';

export default function Home() {
  const allPokemon = useSelector(store => store.allPokemon)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(allPokemon && !allPokemon.length){
      document.title = "Todos los pokemon"; //Cambio el title del tab del navegador
    }
    dispatch(getAll())
  }, [dispatch]);

  return (
    <div>
      <Input/>
      <PokemonCards pokemons={allPokemon}/>
    </div>
  )
}