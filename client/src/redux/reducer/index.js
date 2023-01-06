import { GET_ALL, CLEAR_ALL_POKEMON, POKEMON_DETAIL, 
          CLEAR_POKEMON_DETAIL, GET_ALL_TYPES, 
          RESPONSE_TO_REQUEST, CLEAR_RESPONSE_TO_REQUEST } 
from '../actions/index';

const initialState = {
  allPokemon: [],
  pokemonDetail: {},
  allTypes: [],
  responseToRequest: {}
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

    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: payload
      }
    
    case RESPONSE_TO_REQUEST: 
      return {
        ...state,
        responseToRequest: payload
      }

    case CLEAR_RESPONSE_TO_REQUEST:
      return {
        ...state,
        responseToRequest: {}
      }

    default:
      return state;
  }
}