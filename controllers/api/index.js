const router = require('express').Router();
const userRoutes = require('./userRoutes');
const characterRoutes = require('./characterRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/user', userRoutes);
router.use('/char', characterRoutes);
router.use('/game', gameRoutes);

module.exports = router;
