import {GET_ALL, CLEAR_ALL_POKEMON} from '../actions/index';

const initialState = {
  allPokemon: []
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
      console.log("Voy a limpiar");
      return {
        ...state,
        allPokemon: []
      }
    default:
      return state;
  }
}