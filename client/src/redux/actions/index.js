const urlBackend = 'http://localhost:3001';
export const GET_ALL = 'GET_ALL_POKEMONS';
export const CLEAR_ALL_POKEMON = 'CLEAR_ALL_POKEMON';
export const POKEMON_DETAIL = 'POKEMON_DETAIL';
export const CLEAR_POKEMON_DETAIL = 'CLEAR_POKEMON_DETAIL';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const RESPONSE_TO_REQUEST = 'RESPONSE_TO_REQUEST';


export function searchPokemon(search) {
  return (dispatch) => (
    fetch(`${urlBackend}/pokemons/search/${search}`)
      .then(res => console.log("La respuesta de la busqueda es: ",res))
    //dispatch( {type:GET_ALL, payload: res} )
  )
}

//Busco en el back todos los pokemon
export function getAll() {
  return (dispatch) => {
    fetch(`${urlBackend}/pokemons`)
      .then(res => res.json())
      .then(data => dispatch({ type: GET_ALL, payload: data }))
  }
}

//Limpio del estado de redux todos los pokemon
export function clearAllPokemon() {
  return (dispatch) => dispatch({ type: CLEAR_ALL_POKEMON })
}
//Trae del back el detalle del pokemon segun id (id puede ser api-1 o  db-1)
export function pokemonDetail(id) {
  return (dispatch) => {
    fetch(`${urlBackend}/pokemons/${id}`)
      .then(res => res.json())
      .then(data => dispatch({ type: POKEMON_DETAIL, payload: data }))
  }
}

//Limpia el detalle del pokemon, esto se llama al desmontar el componente PokemonDetail
export function clearDetailPokemon() {
  return (dispatch) => dispatch({ type: CLEAR_POKEMON_DETAIL })
}

//Busca del back todos los type
export function getAllTypes() {
  return (dispatch) => {
    fetch(`${urlBackend}/type`)
      .then(res => res.json())
      .then(data => dispatch({ type: GET_ALL_TYPES, payload: data }));
  }
}

//Crea nuevo pokemon en la base de datos
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

//Envio el formulario de type y me retorna error o todos los types que exista en base de datos
export function createType(request) {
  return (dispatch) => {
    fetch(`${urlBackend}/type`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })//Registro type {name: newType}
    .then(response => response.json())
    //Verifico si la respues es error o todos los types de base de datos y dependiendo despacho
    .then(res => {res.hasOwnProperty('error') 
                  ? dispatch({type: RESPONSE_TO_REQUEST, payload: res}) //Despacho un error
                  : dispatch({type: GET_ALL_TYPES, payload: res}) })//cargo el estado redux de allTypes
    .catch(err => dispatch({type: RESPONSE_TO_REQUEST, payload: err}) );//Despacho un error
  }
}