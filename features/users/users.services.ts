import { UsersModel } from "./users.model";

export class UsersServices {
	async checkEmail(email: string) {
		try {
			const user = await UsersModel.query().findOne({ email }).throwIfNotFound();
			return user;
		} catch (error) {
			console.error(error)
			throw error;
		}
	}

	async createUser(body: object) {
		try {
			const user = await UsersModel.query().insert(body).returning("*");
			return user;
		} catch (error) {
			console.error(error)
			throw error;
		}
	}
}
