import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllTypes, createPokemon } from "../../redux/actions";
import FormCreate from './FormCreate/FormCreate';

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const allTypes = useSelector(store => store.allTypes);
  const response = useSelector(store => store.responseToRequest)

  const formDispatch = (request) => dispatch(createPokemon(request));

  useEffect(() => {
    dispatch(getAllTypes());
  },[]);

  return (
    <FormCreate allTypes={allTypes} 
      formDispatch={formDispatch} 
      response={response}
    />
  )
}