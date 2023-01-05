const { Pokemon } = require('../db');
const {getAllPokemon,getDetailPokemonApi, getDetailPokemonDB} = require('./PokemonUtils');

//Ruta principal ->(get)-> /pokemons
async function index(req, res) {
  try {
    const pokemons = await getAllPokemon();
    
    return res.json(pokemons);
    
  } catch (error) {
    res.json({error: error.message});
  }
};

//Ruta de (get) -> /pokemons/:id(api-id or db-id) -> ruta para la informacion detallada del pokemon
async function show(req, res) {
  try {
    const [destination, id] = req.params.id.split('-');
    
    if (destination === 'api') {
      return res.json(await getDetailPokemonApi(id));
      
    }else if(destination === 'db'){
      return res.json(await getDetailPokemonDB(id));
      
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
    const {name, types, height, weight, hp, attack, defense, speed, img} = req.body;
    
    //Validacion
    if (!name) throw new Error('Faltan campos obligatorios.');

    //Registro del pokemon
    const pokemon = await Pokemon.create({name, height, weight, hp, attack, defense, speed, img });
    
    //Registro de muchos a muchos (Pokemon - Types)
    pokemon.addPokemonTypes(types);
    
    return res.status(201).json({success: true});

  } catch (error) {
    return res.json({error: error.message})
  }
}

function image(req, res) {
  console.log("Estoy por enviar al front la imagen");
  
  // res.sendFile(__dirname + '/store/pokemon.png');
  res.sendFile(`${__dirname}/store/${req.params.name}`);}

module.exports = {
    index,
    show,
    store,
    image
}