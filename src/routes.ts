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

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", ensureAuth, createComplimentController.handle);
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
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
router.get("/tags", ensureAuth, listTagsController.handle);
router.get("/users", ensureAuth, ensureAdmin, listUsersController.handle);

export { router };
