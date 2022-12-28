const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const pokemonRoutes = require('./pokemons.js');
const typeRoutes = require('./type.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('Saludando desde raiz');
})

router.use('/pokemons', pokemonRoutes);
router.use('/type', typeRoutes);

module.exports = router;
