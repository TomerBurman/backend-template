import express from "express";

const router = express.Router();
import user_controller from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *    name: User
 *    description: The User Management API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - _id
 *        - name
 *        - email
 *        - password
 *      properties:
 *        _id:
 *          type: string
 *          description: The user id
 *        name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: The user email
 *        password:
 *          type: string
 *          description: The user password
 *        bio:
 *          type: string
 *          description: The user bio
 *        image:
 *          type: string
 *          description: The user image
 *      example:
 *        _id: "12345"
 *        name: "john"
 *        email: "john@example.com"
 *        password: "hashedpassword"
 *        bio: "This is John's bio"
 *        image: "john_image.png"
 */

/**
 * @swagger
 *  /user/:
 *    get:
 *      summary: Get all users
 *      tags: [User]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: List of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *
 */
router.get("/", authMiddleware, user_controller.get.bind(user_controller));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '123456'
 *         description: Unique ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *      summary: Create a new user
 *      tags: [User]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
router.post("/", authMiddleware, user_controller.post.bind(user_controller));

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.put("/", authMiddleware, user_controller.put.bind(user_controller));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '123456'
 *         description: Unique ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
    "/:id",
    authMiddleware,
    user_controller.remove.bind(user_controller)
);

export default router;
