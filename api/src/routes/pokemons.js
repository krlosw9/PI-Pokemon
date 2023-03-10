const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/Pokemon');

//Agrupadas las rutas '/pokemons'
router
  .route('/')
  .get(pokemonController.index)
  .post(pokemonController.store)

//La ruta del input de busqueda de pokemon /pokemons/search/:txtSearch
router.get('/search/:txtSearch', pokemonController.search)

//La ruta de detalle de pokemon al tener un path diferente por el '/:id' va aparte
router.get('/:id', pokemonController.show)

module.exports = router;