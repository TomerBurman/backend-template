"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
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
router.get("/", auth_middleware_1.default, user_controller_1.default.get.bind(user_controller_1.default));
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
router.get("/:id", auth_middleware_1.default, user_controller_1.default.getById.bind(user_controller_1.default));
/**
 * @swagger
 *  /student:
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
router.post("/", auth_middleware_1.default, user_controller_1.default.post.bind(user_controller_1.default));
router.put("/:id", auth_middleware_1.default, user_controller_1.default.put.bind(user_controller_1.default));
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.remove.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=student_route.js.map