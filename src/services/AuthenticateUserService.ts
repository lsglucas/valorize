import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateRequest) {
		const usersRepository = getCustomRepository(UsersRepositories);

		const user = await usersRepository.findOne({ email });

		if (!user) {
			throw new Error("Email/Password incorrect");
		}

		const passwordIsCorrect = await compare(password, user.password);

		if (!passwordIsCorrect) {
			throw new Error("Email/Password incorrect");
		}

		const token = sign(
			{
				email: user.email,
			},
			process.env.SECRET_TOKEN_KEY,
			{ subject: user.id, expiresIn: "1d" }
		);

		return token;
	}
}

export { AuthenticateUserService };
