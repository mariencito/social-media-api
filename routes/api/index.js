const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//3001/api/
router.use('/thoughts', thoughtRoutes);

 // 3001/api/users
router.use('/users', userRoutes);

module.exports = router;
