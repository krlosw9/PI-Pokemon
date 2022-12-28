import { GET_ALL, CLEAR_ALL_POKEMON, POKEMON_DETAIL, CLEAR_POKEMON_DETAIL } from '../actions/index';

const initialState = {
  allPokemon: [],
  pokemonDetail: {}
}

export default function reducer(state=initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allPokemon: payload
      }
    
    case CLEAR_ALL_POKEMON:
      console.log("Voy a limpiar (logeando desde el reducer)");
      return {
        ...state,
        allPokemon: []
      }

    case POKEMON_DETAIL: 
      return {
        ...state,
        pokemonDetail: payload
      }

    case CLEAR_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: {}
      }


    default:
      return state;
  }
}