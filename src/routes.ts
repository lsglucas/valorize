import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuth } from "./middlewares/ensureAuth";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentService";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { User } from "./entities/User";
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

// Auth
router.post("/login", authenticateUserController.handle);

// Tags
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuth, listTagsController.handle);

// Users

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the SQLite database, you must be logged to do this action.
 *
 *     security:
 *       - bearerAuth: []
 *
 *
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                     example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                   name:
 *                     type: string
 *                     description: The user name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user email.
 *                     example: johndoe@provider.com
 *                   admin:
 *                     type: boolean
 *                     description: It tells if the user is admin or not.
 *                     example: true
 *                   created_at:
 *                     type: timestamp
 *                     description: The date that the user was created.
 *                     example: 2021-06-26T04:10:49.000Z
 *                   updated_at:
 *                     type: timestamp
 *                     description: The date that the user was updated.
 *                     example: 2021-06-26T04:10:49.000Z
 *
 *
 */
router.get("/users", ensureAuth, listUsersController.handle);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the SQLite database, you must be logged to do this action.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user email.
 *                 example: johndoe@provider.com
 *               password:
 *                 type: string
 *                 description: The user password.
 *                 example: MyPassword123
 *               admin:
 *                 type: boolean
 *                 description: It tells if the user is admin or not.
 *                 example: true
 *
 *
 *
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                     example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                   name:
 *                     type: string
 *                     description: The user name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user email.
 *                     example: johndoe@provider.com
 *                   admin:
 *                     type: boolean
 *                     description: It tells if the user is admin or not.
 *                     example: true
 *                   created_at:
 *                     type: timestamp
 *                     description: The date that the user was created.
 *                     example: 2021-06-26T04:10:49.000Z
 *                   updated_at:
 *                     type: timestamp
 *                     description: The date that the user was updated.
 *                     example: 2021-06-26T04:10:49.000Z
 *
 */
router.post("/users", createUserController.handle);

// Compliments
router.post("/compliment", ensureAuth, createComplimentController.handle);
router.get(
	"/users/compliments/send",
	ensureAuth,
	listUserSendComplimentsController.handle
);
router.get(
	"/users/compliments/received",
	ensureAuth,
	listUserReceivedComplimentsController.handle
);

// Sentry test route
/**
 * @swagger
 * /debug-sentry:
 *   get:
 *     summary: Send a test error to Sentry.
 *     description: This is just a test/debug endpoint for sentry.
 *
 *     responses:
 *       400:
 *         description: Emulated bad request error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error.
 *                   example: Sentry test error!
 *
 */
router.get("/debug-sentry", () => {
	throw new Error("Sentry test error!");
});

export { router };
