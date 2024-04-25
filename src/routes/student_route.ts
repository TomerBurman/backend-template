import express from "express";

const router = express.Router();
import student_controller from "../controllers/student_controller";
import authMiddleware from "../common/auth_middleware";

router.get(
    "/",
    authMiddleware,
    student_controller.get.bind(student_controller)
);
router.get(
    "/:id",
    authMiddleware,
    student_controller.getById.bind(student_controller)
);
router.post(
    "/",
    authMiddleware,
    student_controller.post.bind(student_controller)
);
router.put(
    "/:id",
    authMiddleware,
    student_controller.put.bind(student_controller)
);
router.delete(
    "/:id",
    authMiddleware,
    student_controller.remove.bind(student_controller)
);
export default router;
