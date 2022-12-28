const axios = require('axios');
const { Type } = require('../db');

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

async function store(req, res) {
  try {
    const {name} = req.body;
    if(!name) throw new Error('El nombre es requerido.');

    Type.create({name})

    res.status(201).json({success: true})
  } catch (err) {
    res.json({error: err.message});
  }
}

module.exports = {
  index,
  store
}