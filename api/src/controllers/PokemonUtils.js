const axios = require('axios');
const { Pokemon } = require('../db');
const PAGE_SIZE = 12;

//*************Metodos utilizados en index del controlador Pokemon*************

// Esta funcion une las consultas getAllPokemonDB y getAllPokemonApi
const getAllPokemon = async(page) =>{

  if (!page || !page === NaN) page = 1;//Esto es para que no rompa por si ingresan una letra en page

  const {offsetDB,limitApi, offsetApi} = await pagination(page);
  
  const pokemonDB = await getAllPokemonDB(offsetDB);
  const pokemonApi = await getAllPokemonApi(offsetApi, limitApi);
  
  const pokemons = pokemonDB.concat(pokemonApi);

  return pokemons;
}

//Con esta funcion obtenemos el offsetDB, offsetApi, limitApi
const pagination = async (page) =>{
  let offsetDB = 0;
  let offsetApi = 0;
  let limitApi = PAGE_SIZE;

  const count = await Pokemon.count();//Obtenemos cuantos pokemon tenemos registrado en base de datos
  
  const cociente = Math.floor(count / PAGE_SIZE); //con esto sabemos cuantas page ocupara los registros de base de datos
  const residuo = count % PAGE_SIZE ; //con esto sabemos cuantos pokemon de base de datos tendremos en esta o la siguiente page
  
  let numberOfOccupiedPages = cociente; //Numero de page ocupadas por los pokemon guardados en base de datos

  if (residuo > 0) numberOfOccupiedPages ++;//si PAGE_SIZE = 12 y count=13 el residuo es 1
// Pruebas unitarias =D
//page:       3   1   1   3   2
//count:      13  13  2   25  0
//offsetDB:   0   0   0   24  0
//limitApi:   12  12  10  11  12
//offsetApi:  11  0   0   0   12
  if (numberOfOccupiedPages === page) {
    limitApi = PAGE_SIZE - residuo;
    offsetDB = (page-1) * PAGE_SIZE;
    //Aqui no hay offsetApi porque es la primer pagina que trae pokemon de la api
  }else if(numberOfOccupiedPages < page){
    //Aqui ya hay una o mas page con pokemon de la api
    const quantityPokemonApi = (page * PAGE_SIZE) - count//36 -13 -> cantidad de pokemon que se pueden traer desde la api en la (page 3): 23
    offsetApi = quantityPokemonApi - PAGE_SIZE; //23 - 12
    offsetDB = count;
    //limitApi aqui no aplica porque toda esta page es de solo pokemon de la api
  }// else -> si esta condicion se cumple entonces que retorne los valores por default
  
  //Pruebas unitarias =D
  // console.log("page: ", page);
  // console.log("count: ", count);
  // console.log("offsetBD: ", offsetDB);
  // console.log("limitApi: ",limitApi);
  // console.log("offsetApi: ", offsetApi);
  return {offsetDB,limitApi, offsetApi}
}

//Trae todos los pokemon registrados en la base de datos y les da un formato adecuado
const getAllPokemonDB = async(offset=0) =>{

  const dbQuery = await Pokemon.findAll({ include: "PokemonTypes", offset: offset, limit: PAGE_SIZE });

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
const getAllPokemonApi = async(offset=0, limit=PAGE_SIZE) =>{
  //Se trae toda la info de la pokeApi y se le da un formato adecuado para retornar al frontend
  const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
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

//*************Metodos utilizados en search del controlador Pokemon*************
const searchPokemon = async (txtSearch) =>{
  const pokemonDB = await searchPokemonDB(txtSearch);
  const pokemonApi = await searchPokemonApi(txtSearch);

  return pokemonDB.concat(pokemonApi);
}

const searchPokemonApi = (txtSearch) =>{
  const responseApi = axios(`https://pokeapi.co/api/v2/pokemon/${txtSearch}`)
    .then(res => {
      const types = res.data.types.map(pType => pType.type.name); //Le damos formato adecuando a la subconsulta Types
      return {
        id: res.data.id,
        name: res.data.name,
        img: res.data.sprites.other.dream_world.front_default,
        types: types,
        api: true
      }
    })
    .catch(err => []);//Se envia array vacio para que no corte la ejecucion en searchPokemon
  
    return responseApi;
}

const searchPokemonDB = async (txtSearch) => {
  try {
    const dbQuery = await Pokemon.findAll({
      include: "PokemonTypes",  
      where: {
        name: txtSearch
      }
    });
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
  } catch (err) {
    return [];//Se envia array vacio para que no corte la ejecucion en searchPokemon
  }

  
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
  searchPokemon,
  getDetailPokemonApi,
  getDetailPokemonDB
}