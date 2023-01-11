import { useEffect } from "react"
import {useDispatch} from 'react-redux'
import {getAll, getAllTypes} from "../../redux/actions";
import Input from "../Input/Input";
import PokemonCards from '../PokemonCards/PokemonCards';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    document.title = "Todos los pokemon"; //Cambio el title del tab del navegador
    dispatch(getAll())
    dispatch(getAllTypes())

  }, [dispatch]);

  return (
    <div>
      <Input/>
      <PokemonCards/>
    </div>
  )
}