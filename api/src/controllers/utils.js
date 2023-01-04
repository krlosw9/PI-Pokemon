const axios = require('axios');
const { Pokemon } = require('../db');


const getAllPokemon = async() =>{
  const pokemonDB = await getAllPokemonDB();
  const pokemonApi = await getAllPokemonApi();

  const pokemons = pokemonDB.concat(pokemonApi);

  return pokemons;
}

const getAllPokemonDB = async() =>{

  const dbQuery = await Pokemon.findAll({ include: "PokemonTypes" });

  const dbPokemon = dbQuery.map(poke => { //Le damos formato adecuado a la consulta pokemon
    const types = poke.PokemonTypes.map(type => type.name); //Le damos formato adecuando a la subconsulta Types

    return {
      id: poke.id,
      name: poke.name,
      img: poke.img,
      api: false,
      types: types
    }
  });
  
  return dbPokemon;
    
}

const getAllPokemonApi = async() =>{
  //Se trae toda la info de la pokeApi y se le da un formato adecuado para retornar al frontend
  const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon');
  const pokemons = apiResponse.data.results;
  const promisePokemons = pokemons.map( poke => axios.get(poke.url) );
  const promiseAllpokemons = await Promise.all(promisePokemons);

  const pokemonsInfo = promiseAllpokemons.map( promise => {
    const types = promise.data.types.map(pType => pType.type.name); //Le damos formato adecuando a la subconsulta Types
    return {
      id: promise.data.id,
      name: promise.data.name,
      img: promise.data.sprites.other.dream_world.front_default,
      types: types,
      api: true
    }
  } )

  return pokemonsInfo;
}

module.exports = {
  getAllPokemon
}