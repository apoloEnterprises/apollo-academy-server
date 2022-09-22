const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');
const communityController = require('./controllers/communityController');
const rankingsController = require('./controllers/rankingsController')

// --------------------sign up routes-------------------------
router.put('/sign-up/category', userController.index);
router.post('/sign-up', userController.select);
router.post('/sign-in', userController.getIn);
// --------------------**********------------------------

// --------------------community routes-------------------------
router.post('/community/create-post', communityController.postIndex);
router.get('/community/post/:id', communityController.getUserPosts);
router.post('/community/post-by-category', communityController.getPostByCategory);

// number of all posts in that category
router.post('/community/post-total', communityController.getPostNumber);
// number of total answers in a post
router.post('/community/post-answer-number', communityController.getPostTotalAnswersNumber);

router.post('/community/post-create-answer', communityController.postAnwser);
router.post('/community/post-create-comment', communityController.postComment);
router.post('/community/post-answer', communityController.getPostAndAnswers);
// --------------------**********------------------------

// --------------------ranking and level routes-------------------------
router.post('/level-up', rankingsController.userLevelUp);
router.post('/level/insert-exp', rankingsController.insertXP);
// --------------------**********------------------------

module.exports = router;