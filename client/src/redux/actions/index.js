export const GET_ALL = 'GET_ALL_POKEMONS';
export const CLEAR_ALL_POKEMON = 'CLEAR_ALL_POKEMON';
export const POKEMON_DETAIL = 'POKEMON_DETAIL';
export const CLEAR_POKEMON_DETAIL = 'CLEAR_POKEMON_DETAIL';

export function getAll() {
  return (dispatch) => {
    fetch('http://192.168.0.102:3001/pokemons')
      .then( res => res.json())
      .then( data => dispatch({type: GET_ALL, payload: data}) )
  }
}

export function clearAllPokemon() {
  return (dispatch) => dispatch({type: CLEAR_ALL_POKEMON})
}

export function pokemonDetail(id) {
  return (dispatch) => {
    fetch(`http://192.168.0.102:3001/pokemons/${id}`)
      .then(res => res.json())
      .then(data => dispatch({type: POKEMON_DETAIL, payload: data}))
  }
}

export function clearDetailPokemon() {
  return (dispatch) => dispatch({type: CLEAR_POKEMON_DETAIL})
}