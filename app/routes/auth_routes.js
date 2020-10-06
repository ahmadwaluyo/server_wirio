const router = require('express').Router();
const AuthController = require('../controllers/auth_controllers');

router.post('/register', AuthController.register);

module.exports = router;
