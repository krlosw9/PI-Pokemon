const { Type } = require('../db');

async function index(req, res) {
  try {
    const types = await Type.findAll();
  
    if (Object.keys(types).length > 0) {
      res.json(types);
    }
    throw new Error('No existe tipo de pokemon.');

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