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
router.post("/login", authenticateUserController.handle);

// Tags
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuth, listTagsController.handle);

// Users
router.get("/users", ensureAuth, ensureAdmin, listUsersController.handle);
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
router.get("/debug-sentry", () => {
	throw new Error("Sentry test error!");
});

export { router };
