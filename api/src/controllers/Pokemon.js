const axios = require('axios');
const { Pokemon, Type } = require('../db');

//Ruta principal ->(get)-> /pokemons
async function index(req, res) {
  try {
    // const dbPokemon = await Pokemon.findAll();
    // console.log(dbPokemon[0].dataValues);

    const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemons = apiResponse.data.results;
    const promisePokemons = pokemons.map( poke => axios.get(poke.url) );
    const promiseAllpokemons = await Promise.all(promisePokemons);

    const pokemonsInfo = promiseAllpokemons.map( promise => {
      return {
        id: promise.data.id,
        name: promise.data.name,
        img: promise.data.sprites.other.dream_world.front_default,
        types: promise.data.types,
        api: true
      }
    } )
    res.json(pokemonsInfo)
    
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

//Ruta de (get) -> /pokemons/api/:id -> ruta para la informacion detallada del pokemon
async function show(req, res) {
  try {
    const [destination, id] = req.params.id.split('-');
    
    if (destination === 'api') {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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

          return res.json({
            id: response.data.id,
            name: response.data.name,
            img: response.data.sprites.other.dream_world.front_default,
            types: response.data.types,
            height: response.data.height,
            weight: response.data.weight,
            hp: stats[0].hp,
            attack: stats[1].attack,
            defense: stats[2].defense,
            speed: stats[5].speed,
            api: true
          })
        })
        .catch(err => res.status(400).json({error: err.message}))
    }else if(destination === 'db'){
      const poke = await Pokemon.findByPk(id, { include: "PokemonTypes" });
      if(poke) return res.json({...poke.dataValues, api: false})
      //Si no se encontro pokemon, pasa directamente al throw
      throw new Error('Pokemon no encontrado');
      
    }else{
      throw new Error('Parametro generado incorrectamente desde el front.')
    }
  } catch (error) {
    res.status(400)
      .json({error: error.message})
  }
}

//Ruta (post) -> /pokemons
async function store(req, res) {
  try {
    // const {name, hp, attack, defense, speed} = req.body;
    // await Pokemon.create({
    //   name,
      // hp,
      // attack,
      // defense, 
      // speed,
      // api: false
    // });
    const type1 = await Type.create({
      name: 'fire'
    });
    const type2 = await Type.create({
      name: 'water'
    });

    const poke = await Pokemon.create({
      name: 'firstPokemon',
      hp: 1.1,
      attack: 1.2,
      defense: 1.3, 
      speed: 1.4,
      api:false
    });
    
    poke.addPokemonTypes([type1.id, type2.id]);

    return res.status(201).send('Pokemon creado exitosamente');
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

module.exports = {
    index,
    show,
    store
}