import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { hash } from "bcryptjs";

import { UsersRepositories } from "../repositories/UserRepositories";
interface IUserRequest {
	name: string;
	email: string;
	password: string;
	admin?: boolean;
}

class CreateUserService {
	async execute({ name, email, password, admin = false }: IUserRequest) {
		const usersRepository = getCustomRepository(UsersRepositories);

		if (!email) {
			throw new Error("Email incorrect");
		}

		const userAlreadyExists = await usersRepository.findOne({ email });

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const passwordHash = await hash(password, 8);

		const user = usersRepository.create({
			name,
			email,
			admin,
			password: passwordHash,
		});

		await usersRepository.save(user);

		return classToPlain(user);
	}
}

export { CreateUserService };
