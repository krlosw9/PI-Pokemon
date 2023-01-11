const { Pokemon } = require('../db');
const {getAllPokemon, searchPokemon, getDetailPokemonApi, 
      getDetailPokemonDB} = require('./PokemonUtils');

//Ruta principal ->(get)-> /pokemons
async function index(req, res) {
  try {

    const pokemons = await getAllPokemon();
    
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
    const {name, types, height, weight, hp, attack, defense, speed, image} = req.body;
    let img = image;
    //Validacion
    if (!name) throw new Error('Faltan campos obligatorios.');

    //Si el usuario no agrego imagen, entonces nosotros damos una imagen por default

    if (!img) img = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';

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
  res.sendFile(`${__dirname}/store/${req.params.name}`);
}

module.exports = {
    index,
    search,
    show,
    store,
    image
}