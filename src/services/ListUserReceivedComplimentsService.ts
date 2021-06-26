import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IComplimentRequest {
	user_id: string;
}

class ListUserReceivedComplimentsService {
	async execute({ user_id }: IComplimentRequest) {
		const complimentRepository = getCustomRepository(ComplimentsRepositories);

		const compliments = complimentRepository.find({
			where: {
				user_receiver: user_id,
			},
		});

		if (!compliments) {
			throw new Error("Not Found");
		}

		return compliments;
	}
}

export { ListUserReceivedComplimentsService };
