const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');

router.put('/api/users', userController.index);
router.post('/sign-up', userController.select);

module.exports = router;