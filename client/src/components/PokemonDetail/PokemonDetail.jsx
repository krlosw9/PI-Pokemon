import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {pokemonDetail, clearDetailPokemon} from '../../redux/actions';
import DetailCard from './DetailCard/DetailCard';

export default function PokemonDetail(props) {
  let { id } = useParams();
  const pokemonInfo = useSelector(store => store.pokemonDetail);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(pokemonDetail(id))
    return dispatch(clearDetailPokemon())
  },[]);

  if ((pokemonInfo.hasOwnProperty('error') || (Object.keys(pokemonInfo).length === 0))) 
    return <div>No se encontró información detallada del pokemon.</div>
  
  return(
    <div>
      <DetailCard pokemon={pokemonInfo}/>
      <button onClick={() => navigate("/pokemon")}>Regresar</button>
    </div>
  )
}