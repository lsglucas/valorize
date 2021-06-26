import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IComplimentRequest {
	user_id: string;
}

class ListUserSendComplimentsService {
	async execute({ user_id }: IComplimentRequest) {
		const complimentRepository = getCustomRepository(ComplimentsRepositories);

		const compliments = complimentRepository.find({
			where: {
				user_sender: user_id,
			},
			relations: ["userSender", "userReceiver", "tag"],
		});

		if (!compliments) {
			throw new Error("Not Found");
		}

		return compliments;
	}
}

export { ListUserSendComplimentsService };
