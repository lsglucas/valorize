import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
	sub: string;
}

export function ensureAuth(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const token = request.headers.authorization;

	if (!token) {
		return response.status(401).end();
	}

	const authToken = token.split(" ")[1];

	try {
		const { sub } = verify(
			authToken,
			"484a7c311864834e9827a313e78cf575"
		) as IPayload;

		request.user_id = sub;
		return next();
	} catch (error) {
		return response.status(401).end();
	}
}
