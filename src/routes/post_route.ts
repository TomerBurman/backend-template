import express from "express";
const router = express.Router();
import post_controller from "../controllers/post_controller";

router.get("/", post_controller.get.bind(post_controller));
router.get("/:id", post_controller.getById.bind(post_controller));

router.post("/", post_controller.post.bind(post_controller));

router.put("/", post_controller.put.bind(post_controller));

router.delete("/", post_controller.remove.bind(post_controller));

export default router;
