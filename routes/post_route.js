const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/post_controller");

router.get("/", post_controller.getPost);
router.get("/:id", post_controller.getPostById);

router.post("/", post_controller.postPost);

router.put("/", post_controller.updatePost);
router.put("/:id", post_controller.getPostById);

router.delete("/", post_controller.deletePost);
router.delete("/:id", post_controller.deletePostById);

module.exports = router;