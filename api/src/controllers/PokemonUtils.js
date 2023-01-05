const axios = require('axios');
const { Pokemon } = require('../db');

//*************Metodos utilizados en index del controlador Pokemon*************

// Esta funcion une las consultas getAllPokemonDB y getAllPokemonApi
const getAllPokemon = async() =>{
  const pokemonDB = await getAllPokemonDB();
  const pokemonApi = await getAllPokemonApi();

  const pokemons = pokemonDB.concat(pokemonApi);

  return pokemons;
}

//Trae todos los pokemon registrados en la base de datos y les da un formato adecuado
const getAllPokemonDB = async() =>{

  const dbQuery = await Pokemon.findAll({ include: "PokemonTypes" });

  const dbPokemon = dbQuery.map(poke => { //Le damos formato adecuado a la consulta pokemon
    const types = poke.PokemonTypes.map(type => type.name); //Le damos formato adecuado a la subconsulta Types

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
//Trae todos los pokemon de la api
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

//*************Metodos utilizados en show del controlador Pokemon*************

//Este metodo es utilizado desde show en el controlador Pokemon si el parametro es= db-${id}, es usado para que traiga todos los pokemon desde la base de datos
const getDetailPokemonDB = (id) =>{
  const queryDB = Pokemon.findByPk(id, { include: "PokemonTypes" })
    .then(res => {
      const types = res.dataValues.PokemonTypes.map(type => type.name);
      return {//
        id:       res.dataValues.id,
        name:     res.dataValues.name,
        types:    types,//esta propiedad hace que envie el json describiendo key:value (quiero que la peticion a la api y a la db el resultado tenga las mismas propiedades en el json)
        height:   res.dataValues.height,
        weight:   res.dataValues.weight,
        hp:       res.dataValues.hp,
        attack:   res.dataValues.attack,
        defense:  res.dataValues.defense,
        speed:    res.dataValues.speed,
        img:      res.dataValues.img,
        api:      false
      }
    })
  return queryDB;
}

//Este metodo es utilizado desde show en el controlador Pokemon si el parametro es= api-${id}, es usado para que traiga todos los pokemon desde la api (pokeapi)
const getDetailPokemonApi = (id) =>{
  const queryApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {
      /*Paso el map() para dar la siguiente estructura a const stats:
      [
        { hp: 45 },
        { attack: 49 },
        { defense: 49 },
        { 'special-attack': 65 },
        { 'special-defense': 65 },
        { speed: 45 }
      ] */
      const stats = response.data.stats.map(el => ({[el.stat.name]: el.base_stat}))
      const types = response.data.types.map(type => type.type.name)
      
      return {
        id: response.data.id,
        name: response.data.name,
        img: response.data.sprites.other.dream_world.front_default,
        types: types,
        height: response.data.height,
        weight: response.data.weight,
        hp: stats[0].hp,
        attack: stats[1].attack,
        defense: stats[2].defense,
        speed: stats[5].speed,
        api: true
      }
    })
  
  return queryApi;
}


module.exports = {
  getAllPokemon,
  getDetailPokemonApi,
  getDetailPokemonDB
}