import { Express } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export function swagger(app: Express) {
	const options = {
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Valorize Express API with Swagger",
				version: "0.1.0",
				description: "This the Swagger API documentation for valorize api",
				license: {
					name: "MIT",
					url: "https://spdx.org/licenses/MIT.html",
				},
				contact: {
					name: "Lucas",
					email: "lsglucas@pm.me",
				},
			},
			servers: [
				{
					url: "http://localhost:3000/",
					description: "Development server",
				},
			],
		},
		apis: ["./src/routes.ts"],
	};

	const specs = swaggerJsdoc(options);

	app.use("/docs", serve, setup(specs));
}
