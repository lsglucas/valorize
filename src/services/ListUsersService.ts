import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

class ListUsersService {
	async execute() {
		const usersRepository = getCustomRepository(UsersRepositories);

		const users = await usersRepository.find();

		if (!users) {
			throw new Error("Email/Password incorrect");
		}

		return classToPlain(users);
	}
}

export { ListUsersService };
