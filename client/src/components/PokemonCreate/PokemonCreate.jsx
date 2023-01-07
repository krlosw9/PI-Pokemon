import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { getAllTypes } from "../../redux/actions";
import FormCreate from './FormCreate/FormCreate';

export default function PokemonCreate() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Nuevo pokemon"; //Cambio el title del tab del navegador
    dispatch(getAllTypes());
  },[dispatch]);

  return (
    <FormCreate />
  )
}