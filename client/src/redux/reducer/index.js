import { GET_ALL, CLEAR_ALL_POKEMON, FILTER_POKEMON_TYPE,
          FILTER_POKEMON_API, POKEMON_DETAIL, 
          CLEAR_POKEMON_DETAIL, GET_ALL_TYPES, 
          RESPONSE_TO_REQUEST, CLEAR_RESPONSE_TO_REQUEST } 
from '../actions/index';

const initialState = {
  allPokemon: [],
  allPokemonCopy: [], //allPokemon es modificado cada vez que pasa por un reducer de filter, entonces para la segunda vez que se quiera filtrar, va a filtrar los resultados del primer filter
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
        allPokemon: payload,
        allPokemonCopy: payload
      }
    
    case CLEAR_ALL_POKEMON:
      return {
        ...state,
        allPokemon: []
      }
    
    case FILTER_POKEMON_TYPE:
      let filtered = [];
      payload === 'sinFiltro' 
        ? filtered = state.allPokemonCopy
        : filtered = state.allPokemonCopy.filter(poke => poke.types.some(type => type === payload))
      return {
        ...state,
        allPokemon: filtered
      }
    
    case FILTER_POKEMON_API: 
      let filteredTwo = [];

      payload === 'sinFiltro' 
        ? filteredTwo = state.allPokemonCopy
        : filteredTwo = state.allPokemonCopy.filter(poke => poke.api.toString() === payload)
      return {
        ...state,
        allPokemon: filteredTwo
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