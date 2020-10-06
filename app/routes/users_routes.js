const router = require('express').Router();
const UserController = require('../controllers/user_controllers');

// router.post("/login", ControllerUser.login);
// router.get("/", ControllerUser.findAll);
// router.post("/", ControllerUser.create);
// router.patch("/:id", ControllerUser.edit);
// router.delete("/:id", ControllerUser.delete);
router.get('/', UserController.getUser);

module.exports = router;
