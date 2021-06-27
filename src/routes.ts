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
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /login:
 *
 *   post:
 *     summary: Authenticate the user.
 *     description: It takes the user's email and password and returns a Json Web Token that expires after 24 hours.
 *
 *
 *     responses:
 *       200:
 *         description: The user's JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: JWT.
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2FzQHRlc3RlLmNvbSIsImlhdCI6MTYyNDY4MDY1MSwiZXhwIjoxNjI0NzY3MDUxLCJzdWIiOiIzN2EwYTM3Ny1kMjFkLTQxN2YtODE4Mi0wYmE1MTlmZjkwMmYifQ.Wx4UyOld5bKUlMfvLkz7Yk3DTozbyPHj0UZJ5D7pgS4
 *
 *
 */
router.post("/login", authenticateUserController.handle);

// Tags
/**
 * @swagger
 *
 * /tags:
 *   get:
 *     summary: Retrieve a list tags.
 *     description: Retrieve a list with all tags from the SQLite database, you must be logged to do this action.
 *
 *     security:
 *       - bearerAuth: []
 *
 *
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: uuid
 *                     description: Tag unique ID.
 *                     example: 4415b42e-3635-4d44-b465-a0694c1cc78b
 *                   name:
 *                     type: string
 *                     description: Tag name.
 *                     example: leadership
 *                   created_at:
 *                     type: timestamp
 *                     description: The date that the tag was created.
 *                     example: 2021-06-26T04:10:49.000Z
 *                   updated_at:
 *                     type: timestamp
 *                     description: The date that the tag was updated.
 *                     example: 2021-06-26T04:10:49.000Z
 *                   name_custom:
 *                     type: string
 *                     description: Tag's name but with a #.
 *                     example: #leadership
 *
 */
router.get("/tags", ensureAuth, listTagsController.handle);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a tag.
 *     description: Create a new tag with the given name, and stores it in the SQLite database.
 *
 *     security:
 *       - bearerAuth: []
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
 *                 description: The name for the tag.
 *                 example: leadership
 *
 *
 *
 *     responses:
 *       200:
 *         description: The tag's data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: uuid
 *                   description: The user ID.
 *                   example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                 name:
 *                   type: string
 *                   description: The user name.
 *                   example: John Doe
 *                 created_at:
 *                   type: timestamp
 *                   description: The date that the user was created.
 *                   example: 2021-06-26T04:10:49.000Z
 *                 updated_at:
 *                   type: timestamp
 *                   description: The date that the user was updated.
 *                   example: 2021-06-26T04:10:49.000Z
 *
 */
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);

// Users

/**
 * @swagger
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
 *                     type: uuid
 *                     description: User ID.
 *                     example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                   name:
 *                     type: string
 *                     description: User name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: User email.
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
router.get("/users", ensureAuth, listUsersController.handle);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: Create a new user with the given data and stores it in the SQLite database.
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
 *         description: The user's data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: uui
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
/**
 * @swagger
 * /compliment:
 *   post:
 *     summary: Create a compliment.
 *     description: Create a new compliment, and send it to the desired user.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_id:
 *                 type: uuid
 *                 description: The tag id that you want to use.
 *                 example: 29df483e-2c1b-4fb1-834e-4d0347e0bb37
 *               user_receiver:
 *                 type: uuid
 *                 description: The receiver user id.
 *                 example: b7f6e01c-ee5b-4197-9ba4-cf840f1ddde1
 *               message:
 *                 type: uuid
 *                 description: The message you want to send to the user.
 *                 example: Thanks for the help with NodeJS, I couldn't have done without you!!
 *
 *
 *     responses:
 *       200:
 *         description: The compliment data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: uui
 *                   description: The compliment id.
 *                   example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                 user_sender:
 *                   type: uuid
 *                   description: The user sender id.
 *                   example: 87013eeb-7462-4029-8649-952de2c595dc
 *                 user_receiver:
 *                   type: uuid
 *                   description: The id of the user that received the compliment.
 *                   example: b7f6e01c-ee5b-4197-9ba4-cf840f1ddde1
 *                 tag_id:
 *                   type: uuid
 *                   description: The id of the tag that you sent.
 *                   example: 29df483e-2c1b-4fb1-834e-4d0347e0bb37
 *                 message:
 *                   type: string
 *                   description: The message that you sent to the user.
 *                   example: Thanks for the help with NodeJS, I couldn't have done without you!!
 *                 created_at:
 *                   type: timestamp
 *                   description: The date that the compliment was sent.
 *                   example: 2021-06-26T04:10:49.000Z
 *
 */
router.post("/compliment", ensureAuth, createComplimentController.handle);

/**
 * @swagger
 *
 * /users/compliments/sent:
 *   get:
 *     summary: Retrieve a list of sent compliments.
 *     description: Retrieve a list of all compliments sent by the user, you must be logged to do this action.
 *
 *     security:
 *       - bearerAuth: []
 *
 *
 *     responses:
 *       200:
 *         description: A list of compliments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: uui
 *                     description: The compliment id.
 *                     example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                   user_sender:
 *                     type: uuid
 *                     description: The user sender id.
 *                     example: 87013eeb-7462-4029-8649-952de2c595dc
 *                   user_receiver:
 *                     type: uuid
 *                     description: The id of the user that received the compliment.
 *                     example: b7f6e01c-ee5b-4197-9ba4-cf840f1ddde1
 *                   tag_id:
 *                     type: uuid
 *                     description: The id of the tag that you sent.
 *                     example: 29df483e-2c1b-4fb1-834e-4d0347e0bb37
 *                   message:
 *                     type: string
 *                     description: The message that you sent to the user.
 *                     example: Thanks for the help with NodeJS, I couldn't have done without you!!
 *                   created_at:
 *                     type: timestamp
 *                     description: The date that the compliment was sent.
 *                     example: 2021-06-26T04:10:49.000Z
 *
 */
router.get(
	"/users/compliments/send",
	ensureAuth,
	listUserSendComplimentsController.handle
);

/**
 * @swagger
 *
 * /users/compliments/received:
 *   get:
 *     summary: Retrieve a list of received compliments.
 *     description: Retrieve a list of all compliments received from the user, you must be logged to do this action.
 *
 *     security:
 *       - bearerAuth: []
 *
 *
 *     responses:
 *       200:
 *         description: A list of compliments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: uui
 *                     description: The compliment id.
 *                     example: 37a0a377-d21d-417f-8182-0ba519ff902f
 *                   user_sender:
 *                     type: uuid
 *                     description: The user sender id.
 *                     example: 87013eeb-7462-4029-8649-952de2c595dc
 *                   user_receiver:
 *                     type: uuid
 *                     description: The id of the user that received the compliment.
 *                     example: b7f6e01c-ee5b-4197-9ba4-cf840f1ddde1
 *                   tag_id:
 *                     type: uuid
 *                     description: The id of the tag that you sent.
 *                     example: 29df483e-2c1b-4fb1-834e-4d0347e0bb37
 *                   message:
 *                     type: string
 *                     description: The message that you sent to the user.
 *                     example: Thanks for the help with NodeJS, I couldn't have done without you!!
 *                   created_at:
 *                     type: timestamp
 *                     description: The date that the compliment was sent.
 *                     example: 2021-06-26T04:10:49.000Z
 *
 */
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
