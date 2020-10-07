const router = require('express').Router();
const UserController = require('../controllers/user_controllers');

router.get('/', UserController.getUser);
router.post("/login", UserController.login);
// router.get("/", ControllerUser.findAll);
// router.post("/", ControllerUser.create);
// router.patch("/:id", ControllerUser.edit);
// router.delete("/:id", ControllerUser.delete);

module.exports = router;
