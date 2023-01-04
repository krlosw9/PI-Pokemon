const axios = require('axios');
const { Pokemon, Type } = require('../db');
const {getAllPokemon} = require('./utils');

//Ruta principal ->(get)-> /pokemons
async function index(req, res) {
  try {
    const pokemons = await getAllPokemon();
    
    return res.json(pokemons);
    
  } catch (error) {
    res.json({error: error.message});
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
          const types = response.data.types.map(type => type.type.name)
          return res.json({
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
          })
        })
        .catch(err => res.json({error: err.message}))
    }else if(destination === 'db'){
      const poke = await Pokemon.findByPk(id, { include: "PokemonTypes" });
      
      if(poke){
        const types = poke.dataValues.PokemonTypes.map(type => type.name);
        return res.json({//
          id:       poke.dataValues.id,
          name:     poke.dataValues.name,
          types:    types,//esta propiedad hace que envie el json describiendo key:value (quiero que la peticion a la api y a la db el resultado tenga las mismas propiedades en el json)
          height:   poke.dataValues.height,
          weight:   poke.dataValues.weight,
          hp:       poke.dataValues.hp,
          attack:   poke.dataValues.attack,
          defense:  poke.dataValues.defense,
          speed:    poke.dataValues.speed,
          api:      false
        })
      } 
      //Si no se encontro pokemon, pasa directamente al throw
      throw new Error('Pokemon no encontrado');
      
    }else{
      throw new Error('Parametro generado incorrectamente desde el cliente.')
    }
  } catch (error) {
    res.json({error: error.message})
  }
}

//Ruta (post) -> /pokemons
async function store(req, res) {
  try {
    const {name, types, height, weight, hp, attack, defense, speed, image} = req.body;
    
    //Validacion
    if (!name) throw new Error('Faltan campos obligatorios.');

    //Registro del pokemon
    const pokemon = await Pokemon.create({name, height, weight, hp, attack, defense, speed, image });
    
    //Registro de muchos a muchos (Pokemon - Types)
    pokemon.addPokemonTypes(types);
    
    return res.status(201).json({success: true});

  } catch (error) {
    return res.json({error: error.message})
  }
}

function image(req, res) {
  console.log("Estoy por enviar la imagen");
  
  // res.sendFile(__dirname + '/store/pokemon.png');
  res.sendFile(`${__dirname}/store/${req.params.name}`);}

module.exports = {
    index,
    show,
    store,
    image
}