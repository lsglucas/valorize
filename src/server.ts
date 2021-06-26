import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { init, Handlers, Integrations as nodeIntegrations } from "@sentry/node";
import { Integrations as tracingIntegrations } from "@sentry/tracing";
import { config } from "dotenv";
import cors from "cors";

import { router } from "./routes";
import "./database";

const app = express();

config({ path: __dirname + "/.env" });

init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new nodeIntegrations.Http({ tracing: true }),
		new tracingIntegrations.Express({ app }),
	],

	tracesSampleRate: 1.0,
});

app.use(Handlers.requestHandler());

app.use(Handlers.tracingHandler());

app.use(express.json());

app.use(router);

app.use(cors()); // Used in front-end

app.use(Handlers.errorHandler());

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
