const router = require("express").Router();
const ControllerUser = require("../controllers/ControllerUser");

router.post("/login", ControllerUser.login);
router.get("/", ControllerUser.findAll);
router.post("/", ControllerUser.create);
router.patch("/:id", ControllerUser.edit);
router.delete("/:id", ControllerUser.delete);

module.exports = router;