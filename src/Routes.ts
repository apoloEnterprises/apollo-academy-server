const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');

router.get('/api/users', userController.index);

module.exports = router;