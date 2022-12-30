const urlBackend = 'http://192.168.0.102:3001';
export const GET_ALL = 'GET_ALL_POKEMONS';
export const CLEAR_ALL_POKEMON = 'CLEAR_ALL_POKEMON';
export const POKEMON_DETAIL = 'POKEMON_DETAIL';
export const CLEAR_POKEMON_DETAIL = 'CLEAR_POKEMON_DETAIL';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const RESPONSE_TO_REQUEST = 'RESPONSE_TO_REQUEST';

export function getAll() {
  return (dispatch) => {
    fetch(`${urlBackend}/pokemons`)
      .then(res => res.json())
      .then(data => dispatch({ type: GET_ALL, payload: data }))
  }
}

export function clearAllPokemon() {
  return (dispatch) => dispatch({ type: CLEAR_ALL_POKEMON })
}

export function pokemonDetail(id) {
  return (dispatch) => {
    fetch(`${urlBackend}/pokemons/${id}`)
      .then(res => res.json())
      .then(data => dispatch({ type: POKEMON_DETAIL, payload: data }))
  }
}

export function clearDetailPokemon() {
  return (dispatch) => dispatch({ type: CLEAR_POKEMON_DETAIL })
}

export function getAllTypes() {
  return (dispatch) => {
    fetch(`${urlBackend}/type`)
      .then(res => res.json())
      .then(data => dispatch({ type: GET_ALL_TYPES, payload: data }));
  }
}

export function createPokemon(request) {
  return (dispatch) => {
    fetch(`${urlBackend}/pokemons`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(res => dispatch({type: RESPONSE_TO_REQUEST, payload: res}) )
    .catch (err => dispatch({type: RESPONSE_TO_REQUEST, payload: err}));
  }
}