import express from "express";
const router = express.Router();
import post_controller from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, post_controller.get.bind(post_controller));
router.get(
    "/:id",
    authMiddleware,
    post_controller.getById.bind(post_controller)
);

router.post("/", authMiddleware, post_controller.post.bind(post_controller));

router.put("/", authMiddleware, post_controller.put.bind(post_controller));

router.delete(
    "/",
    authMiddleware,
    post_controller.remove.bind(post_controller)
);

export default router;
