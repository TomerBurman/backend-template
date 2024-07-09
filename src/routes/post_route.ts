import express from "express";
const router = express.Router();
import post_controller from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";

/**
 * @swagger
 * tags:
 *    name: Post
 *    description: The Post Management API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - _id
 *        - title
 *        - ingredients
 *        - description
 *        - steps
 *        - owner
 *      properties:
 *        _id:
 *          type: string
 *          description: The post id
 *        title:
 *          type: string
 *          description: The post title
 *        ingredients:
 *          type: array
 *          items:
 *            type: string
 *          description: The ingredients of the post
 *        description:
 *          type: string
 *          description: The post description
 *        steps:
 *          type: array
 *          items:
 *            type: string
 *          description: The steps to create the post
 *        owner:
 *          type: string
 *          description: The id of the user who owns the post
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          description: Images related to the post
 *        ownerName:
 *          type: string
 *          description: The name of the owner
 *        savedUsers:
 *          type: array
 *          items:
 *            type: string
 *          description: IDs of users who have saved the post
 *      example:
 *        _id: "12345"
 *        title: "Delicious Recipe"
 *        ingredients: ["ingredient1", "ingredient2"]
 *        description: "This is a test description"
 *        steps: ["step1", "step2"]
 *        owner: "67890"
 *        images: ["image1.png", "image2.png"]
 *        ownerName: "John Doe"
 *        savedUsers: ["11111", "22222"]
 */

/**
 * @swagger
 *  /post/:
 *    get:
 *      summary: Get all posts
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: List of all posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 *
 */
router.get("/", authMiddleware, post_controller.get.bind(post_controller));

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '123456'
 *         description: Unique ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get(
    "/:id",
    authMiddleware,
    post_controller.getById.bind(post_controller)
);

/**
 * @swagger
 *  /post:
 *    post:
 *      summary: Create a new post
 *      tags: [Post]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          201:
 *              description: Post created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
router.post("/", authMiddleware, post_controller.post.bind(post_controller));

/**
 * @swagger
 * /post:
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       400:
 *         description: Bad request
 */
router.put("/", authMiddleware, post_controller.put.bind(post_controller));

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '123456'
 *         description: Unique ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete(
    "/:id",
    authMiddleware,
    post_controller.remove.bind(post_controller)
);

export default router;
