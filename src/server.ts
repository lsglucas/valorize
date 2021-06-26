import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { Handlers } from "@sentry/node";
import { config } from "dotenv";
import cors from "cors";

import { router } from "./routes";
import { setUpSentry, setUpSwagger } from "./plugins";
import "./database";

const app = express();

config({ path: __dirname + "/.env" });

setUpSentry(app);

app.use(express.json());

app.use(router);

app.use(cors()); // Used in front-end

app.use(Handlers.errorHandler());

setUpSwagger(app);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof Error) {
			return response.status(400).json({ error: err.message });
		}

		return response.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
);

app.listen(3000, () => console.log("Server is running!"));
