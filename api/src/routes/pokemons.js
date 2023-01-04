const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/Pokemon');

//Agrupadas las rutas '/pokemons'
router
  .route('/')
  .get(pokemonController.index)
  .post(pokemonController.store)

//Esta ruta trae una imagen(esta es la imagen del pokemon que se registro mediante el form desde el front)
router.get('/image/:name', pokemonController.image)

//La ruta de detalle de pokemon al tener un path diferente por el '/:id' va aparte
router.get('/:id', pokemonController.show)

module.exports = router;