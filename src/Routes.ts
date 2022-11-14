const { Router } = require('express');

const router = Router();
const userController = require('./controllers/userController');
const communityController = require('./controllers/communityController');
const rankingsController = require('./controllers/rankingsController')
const coursesController = require('./controllers/coursesController')
  
// -------------------- user routes-------------------------
router.put('/sign-up/category', userController.index);
router.post('/sign-up', userController.select);
router.post('/sign-in', userController.getIn);
router.post('/feed', userController.handleFeed);
router.post('/insert-user-category', userController.inserUserCategory);
router.post('/checkname', userController.checkUserName);
router.post('/change-name', userController.changeUsername);
router.get('/find-name/:id_usuario', userController.findFullName);
router.post('/insert-fullname', userController.insertFullname);
router.post('/show-fullname', userController.changeSettingShowFullname);
router.post('/get-fullname-config', userController.getConfigFullname);
router.post('/`get-slide-visto`', userController.findVistoSlide);
router.post('/insert-slide-visto', userController.insertSlideVisto);
router.post('/notifications', userController.getNotfications);
// --------------------**********------------------------
    
// -------- ------------community routes-------------------------
router.post('/community/create-post', communityController.postIndex);
router.get('/community/post/:id', communityController.getUserPosts);
router.get('/community/posts/:categoria/:subCategoria', communityController.getPostByCategory);
// number of all posts in that category
router.post('/community/post-total', communityController.getPostNumber);
// number of total answers in a post
router.get('/community/post-total-answer/:id', communityController.getPostTotalAnswersNumber);
router.post('/community/post-create-answer', communityController.postAnwser);
router.post('/community/like-comment', communityController.likeAnswer);
router.get('/community/like-comment/:resposta_id', communityController.listLikesAnswer);
router.get('/community/like-comment/:resposta_id/:autor_like', communityController.listSelfLikesAnswer); 
router.post('/community/post-create-comment', communityController.postComment);
router.post('/community/post-create-comment-answer', communityController.postCommentToQuestion);
router.get('/community/get-comments-answer/:pergunta_ID', communityController.getCommentsQuestion);
router.get('/community/get-comments/:resposta_ID', communityController.getCommentAnswer);
router.get('/community/post-answer/:id', communityController.getPostAndAnswers);
// --------------------**********------------------------

// --------------------ranking and thrphy routes-------------------------
router.get('/question-trophy/:name/:id_user', rankingsController.trophy);
router.get('/total-user-trophies/:nome', rankingsController.getTotalUserTrophies); 
router.get('/list-user-each-trophy/:nome', rankingsController.getUserEachTrophyNumber);
// --------------------**********------------------------
      
 
// --------------------courses-------------------------  
router.post('/watching', coursesController.verifyWatched); 
router.post('/get-time', coursesController.getTime); 
router.post('/insert-my-list', coursesController.insertIntoMyFavList);
router.post('/insert-download', coursesController.insertIntoDownload);
router.post('/insert-course', coursesController.insertCourse);
router.post('/get-course-category', coursesController.getCourseAndCategory);
router.post('/insert-watcing', coursesController.insertWatching);
router.post('/insert-category', coursesController.insertCourseCategory);
router.post('/insert-aula', coursesController.insertAula);
router.post('/insert-modulo', coursesController.insertModolo); 
router.post('/get-modules', coursesController.getModules); 
router.post('/get-aulas', coursesController.getAulas);   
router.post('/send-rating', coursesController.sendRating);   
router.post('/inscrever-curso-aluno', coursesController.inscreverCursoAluno);  
router.get('/get-media-nota/:id_curso', coursesController.getMediaNota);   
router.get('/get-alunos/:id_aluno', coursesController.getNumAlunos);  
router.get('/get-courses-feed', coursesController.returnCursoFeed); 
router.get('/get-aluno-cursos/:id', coursesController.getAlunoCursos);   
router.get('/get-liked', coursesController.getliked);   
  
// router.post('/aula-1', coursesController.hostCourse);
// --------------------**********------------------------


module.exports = router;