const router = require('express').Router();
const PostController = require('../controllers/post_controllers');

router.post('/', PostController.createPost);
router.get('/', PostController.getPosts);
// router.patch('/:id', PostController.editArticle);
// router.delete('/:id', PostController.deleteArticle);

module.exports = router;
