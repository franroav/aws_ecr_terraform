const { Router } = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  register,
  subscription,
} = require("../controllers/subscription");
const { check } = require("express-validator");
const { emailValidator } = require("../middlewares/validateEmail");
const { emailExist, emailNotExist } = require("../helpers/database-validator");

const router = Router();

/**
 * @swagger
 * /api/register/invite/{code}:
 *   post:
 *     summary: Register with an invite code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.post(
  "/register/invite/:code",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailExist),
    emailValidator,
  ],
  subscription
);

/**
 * @swagger
 * /api/subscription/register:
 *   post:
 *     summary: Register a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Subscription registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.post(
  "/subscription/register",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailNotExist),
    emailValidator,
  ],
  register
);
/**
 * @swagger
 * /api/subscription:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/subscription", getAll);

/**
 * @swagger
 * /api/subscription:
 *   post:
 *     summary: Create a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.post(
  "/subscription",
  [
    check(
      "email",
      "emailUser no se encontro en el cuerpo de la peticion"
    ).isEmail(),
    check("email").custom(emailExist),
    emailValidator,
  ],
  create
);
/**
 * @swagger
 * /api/subscription/{id}:
 *   get:
 *     summary: Retrieve a subscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A subscription object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.get("/subscription/:id", getOne);


/**
 * @swagger
 * /api/subscription/{id}:
 *   put:
 *     summary: Update a subscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.put("/subscription/:id", update);
/**
 * @swagger
 * /api/subscription/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 */
router.delete("/subscription/:id", deleteOne);

module.exports = router;
