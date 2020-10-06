const router = require("express").Router();
const PostController = require("../controllers/ControllerPost");

router.get("/", PostController.findAllArticle);
router.post("/", PostController.postArticle);
router.patch("/:id", PostController.editArticle);
router.delete("/:id", PostController.deleteArticle);

module.exports = router;