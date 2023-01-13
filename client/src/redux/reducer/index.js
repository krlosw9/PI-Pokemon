import { GET_ALL, CLEAR_ALL_POKEMON, FILTER_POKEMON_TYPE,
          FILTER_POKEMON_API, ORDER_BY_NAME, ORDER_BY_ATTACK, 
          POKEMON_DETAIL, CLEAR_POKEMON_DETAIL, GET_ALL_TYPES, 
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

      //el payload llega como string -> 'true' o 'false' por esa razon toca convertir a string el poke.api
      payload === 'sinFiltro' 
        ? filteredTwo = state.allPokemonCopy
        : filteredTwo = state.allPokemonCopy.filter(poke => poke.api.toString() === payload) 
      return {
        ...state,
        allPokemon: filteredTwo
      }
    
    case ORDER_BY_NAME:
      let orderByName = orderFunction([...state.allPokemonCopy] ,payload, 'name');
      
      return {
        ...state,
        allPokemon: orderByName
      }
    
    case ORDER_BY_ATTACK:
      let orderAttack = orderFunction([...state.allPokemonCopy], payload, 'attack');

      return {
        ...state,
        allPokemon: orderAttack
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

const orderFunction = (pokemons, orientation, property) => {
  //En pokemons llega una copia de state.allPokemonCopy, porque el metodo sort() ordena el contenido del array en la memoria del mismo, entonces antes de hacer return, ya esta modificado el state, por lo tanto redux no envia a los componentes que utilizan allPokemon (porque modifica el original, redux envia el re-render cuando compara la copia que le envio el reducer y lo que tiene en el state en ese momento)
  let order = [];

  if (orientation === 'sinFiltro'){ 
    order = pokemons 
  }else if(orientation === 'up'){
    order = pokemons.sort((firstEl, secondEl) =>{
      if (firstEl[property] > secondEl[property]) return 1
      if (firstEl[property] < secondEl[property]) return -1
      return 0;//Si ninguna de los dos if anteriores se cumple retorna aqui
    } )
  }else if(orientation === 'down'){
    order = pokemons.sort((firstEl, secondEl) =>{
      if (firstEl[property] > secondEl[property]) return -1
      if (firstEl[property] < secondEl[property]) return 1
      return 0;//Si ninguna de los dos if anteriores se cumple retorna aqui
    } )
  }

  return order;
}