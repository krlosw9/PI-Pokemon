import { useEffect } from "react"
import {useDispatch} from 'react-redux'
import {getAll} from "../../redux/actions";
import Input from "../Input/Input";
import PokemonCards from '../PokemonCards/PokemonCards';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    document.title = "Todos los pokemon"; //Cambio el title del tab del navegador
    dispatch(getAll())

  }, [dispatch]);

  return (
    <div>
      <Input/>
      <PokemonCards/>
    </div>
  )
}