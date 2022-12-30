const axios = require('axios');
const { Type } = require('../db');

//Envia al frontend todos los types, si no tiene registrados type en la base de datos, registra todos los types que tiene la pokeapi
async function index(req, res) {
  try {
    const types = await Type.findAll();
    
    //verifica si tiene registros en base de datos, si tiene regristros retorna esta información
    if (Object.keys(types).length > 0) {
      return res.json(types);
    }else{
      //Si no tiene registros en base de datos, busca todos los type en la pokeapi
      axios.get(`https://pokeapi.co/api/v2/type`)
        .then(async (response) => {
          const data = await Object.values(response.data.results).map(type => ({name: type.name}) )
          Type.bulkCreate(data) //registra en base de datos todo lo traido de la pokeapi
        }).then(() => Type.findAll())//Hace una consulta a base de datos, pidiendo todos los type
        .then(query => res.json(query))//Retorna todos los type que estan guardados en la base de datos
        .catch(err => res.json({error: err.message}))
           
    }
  } catch (err) {
    res.json({error: err.message});
  }
}

//Guarda el type que el usuario intenta registrar desde el formulario (frontend)PokemonCreate
async function store(req, res) {
  try {
    const {name} = req.body;
    if(!name) throw new Error('El nombre es requerido.');

    Type.create({name})//Registra el type que el usuario digito
      .then(() => Type.findAll())//Apenas registre el type, consulta todos los type en base de datos
      .then(query => res.json(query) )//Retorna todos los type que existen en DB como resultado de registrar el nuevo type
      .catch(err => res.json({error: err.message}));//Si existe un error lo retorna evitando que rompa el back
  } catch (err) {
    res.json({error: err.message});
  }
}

module.exports = {
  index,
  store
}