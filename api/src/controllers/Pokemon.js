const axios = require('axios');
const { Pokemon } = require('../db')
//const poke = require('../models/Pokemon.js');

async function index(req, res) {
  try {
    const dbPokemon = await Pokemon.findAll();
    console.log(dbPokemon[0].dataValues);

    const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemons = apiResponse.data.results;
    const promisePokemons = pokemons.map( poke => axios.get(poke.url) );
    const promiseAllpokemons = await Promise.all(promisePokemons);

    const pokemonsInfo = promiseAllpokemons.map( promise => {
      return {
        name: promise.data.name,
        img: promise.data.sprites.other.dream_world.front_default,
        types: promise.data.types,
        api: true
      }
    } )
    res.json(pokemonsInfo)
    
  } catch (error) {
    console.error("Error al llamar la api........................!!!!!!!!!!!!!!!!!!", error.message);
    res.sendStatus(500);
  }
};

async function store(req, res) {
  try {
    const {name, live, attack, shield, speed} = req.body;
    await Pokemon.create({
      name,
      live,
      attack,
      shield, 
      speed,
      api: false
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500).json({message: error.message})
  }
}

module.exports = {
    index,
    store
}