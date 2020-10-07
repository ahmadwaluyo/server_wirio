const router = require('express').Router();
const PostController = require('../controllers/post_controllers');
const { protects } = require('../middlewares/auth');

router.post('/', protects, PostController.createPost);
router.get('/', protects, PostController.getPosts);

module.exports = router;
