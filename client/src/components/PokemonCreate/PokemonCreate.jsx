import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllTypes, createPokemon, createType } from "../../redux/actions";
import FormCreate from './FormCreate/FormCreate';

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);
  const response = useSelector(store => store.responseToRequest)

  //Funciones que se envian a los componentes hijos, para despachar la accion que envia el Post
  const registerPokemon = (request) => dispatch(createPokemon(request));
  const registerType = (request) => dispatch(createType(request));//

  useEffect(() => {
    dispatch(getAllTypes());
  },[]);

  return (
    <FormCreate allTypes={allTypes}
      registerPokemon={registerPokemon} 
      registerType={registerType}
      response={response}
    />
  )
}