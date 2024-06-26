import express from "express";

const router = express.Router();
import user_controller from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";
/**
 * @swagger
 * tags:
 *    name: Student
 *    description: The Authentication API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Student:
 *      type: object
 *      required:
 *        - _id
 *        - name
 *        - age
 *      properties:
 *        _id:
 *          type: string
 *          description: The user id
 *        name:
 *          type: string
 *          description: The user name
 *        age:
 *          type: number
 *          description: The user age
 *      example:
 *        _id: "12345"
 *        name: "john"
 *        age: "25"
 */

/**
 * @swagger
 *  /student/:
 *    get:
 *      summary: get all students
 *      tags: [Student]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all students
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Student'
 *
 */
router.get("/", authMiddleware, user_controller.get.bind(user_controller));
/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: 'Get a student by ID'
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '123456'
 *         description: 'Unique ID of the student to retrieve'
 *     responses:
 *       200:
 *         description: student details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.get(
    "/:id",
    authMiddleware,
    user_controller.getById.bind(user_controller)
);

/**
 * @swagger
 *  /user:
 *    post:
 *      summary: 'Create a new student'
 *      tags: [Student]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Student'
 *      responses:
 *          201:
 *              description: Student created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Student'
 */
router.post("/", authMiddleware, user_controller.post.bind(user_controller));
router.put("/:id", authMiddleware, user_controller.put.bind(user_controller));
router.delete(
    "/:id",
    authMiddleware,
    user_controller.remove.bind(user_controller)
);
export default router;
