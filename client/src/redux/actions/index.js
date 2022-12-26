export const GET_ALL = 'GET_ALL_POKEMONS';

export function getAll() {
  return (dispatch) => {
    fetch('http://192.168.0.102:3001/pokemons')
      .then( res => res.json())
      .then( data => dispatch({type: GET_ALL, payload: data}) )
  }
}