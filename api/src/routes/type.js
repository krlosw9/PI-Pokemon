const express = require('express');
const router = express.Router();

const typeController = require('../controllers/Type');

//Agrupadas las rutas '/type'
router
  .route('/')
  .get(typeController.index) // -> '/type'
  .post(typeController.store) // -> '/store'

module.exports = router;