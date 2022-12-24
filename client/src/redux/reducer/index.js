import {GET_ALL} from '../actions/index';

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
  
    default:
      return state;
  }
}