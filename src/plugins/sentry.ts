import { init, Handlers, Integrations as nodeIntegrations } from "@sentry/node";
import { Integrations as tracingIntegrations } from "@sentry/tracing";
import { Express } from "express";
import { config } from "dotenv";

export function sentry(app: Express) {
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
}
