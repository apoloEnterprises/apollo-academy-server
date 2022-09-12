const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');

router.put('/sign-up/category', userController.index);
router.post('/sign-up', userController.select);

// router.post('/getCategory', userController.select);

// router.post('/user/:id', userController.select);

module.exports = router;