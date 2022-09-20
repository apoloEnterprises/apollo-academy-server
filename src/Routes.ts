const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');
const communityController = require('./controllers/communityController');

// sign up routes
router.put('/sign-up/category', userController.index);
router.post('/sign-up', userController.select);

// community routes
router.post('/community/create-post', communityController.postIndex);
router.get('/community/post/:id', communityController.getUserPosts);
router.post('/community/post-by-category', communityController.getPostByCategory);
router.post('/community/post-total', communityController.getPostNumber);
router.post('/community/post-create-answer', communityController.postAnwser);
router.post('/community/post-answer', communityController.getPostAndAnswers);
// getPostNumber
// router.post('/getCategory', userController.select);

// router.post('/user/:id', userController.select);

module.exports = router;