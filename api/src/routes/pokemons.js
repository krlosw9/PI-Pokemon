const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/Pokemon');

router
  .route('/')
  .get(pokemonController.index)
  .post(pokemonController.store)

module.exports = router;