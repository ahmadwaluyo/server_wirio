const router = require('express').Router();
const PostController = require('../controllers/post_controllers');
const { protects } = require('../middlewares/auth');

router.post('/', protects, PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
