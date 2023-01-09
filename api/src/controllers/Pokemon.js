const { Pokemon } = require('../db');
const {getAllPokemon, searchPokemon, getDetailPokemonApi, 
      getDetailPokemonDB} = require('./PokemonUtils');

//Ruta principal ->(get)-> /pokemons
async function index(req, res) {
  try {
    const page = parseInt(req.query.page);

    const pokemons = await getAllPokemon(page);
    
    return res.json(pokemons);
    
  } catch (error) {
    res.json({error: error.message});
  }
};

async function search(req, res) {
  try {
    return res.json(await searchPokemon(req.params.txtSearch));
  } catch (err) {
    res.json([]);//las consultas de searchPokemonDB() y searchPokemonApi() si dan algun error regresan un array vacio para no cortar ejecucion (la query de api no corta a la de base de datos ni viceversa), entonces en el front si llega array vacio, da mensaje de pokemon no encontrado
  }
}

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
    search,
    show,
    store,
    image
}