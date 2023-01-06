import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllTypes, createType } from "../../redux/actions";
import FormCreate from './FormCreate/FormCreate';

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);
  const response = useSelector(store => store.responseToRequest)

  //Funciones que se envian a los componentes hijos, para despachar la accion que envia el Post
  const registerType = (request) => dispatch(createType(request));//

  useEffect(() => {
    dispatch(getAllTypes());
  },[dispatch]);

  return (
    <FormCreate allTypes={allTypes}
      registerType={registerType}
      response={response}
    />
  )
}