const router = require('express').Router();
const UserController = require('../controllers/user_controllers');
const { protects } = require('../middlewares/auth');

router.get('/', protects, UserController.getUser);

module.exports = router;
