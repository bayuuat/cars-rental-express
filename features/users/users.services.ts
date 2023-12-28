import { UsersModel } from "./users.model";

class UsersServices {
	public async checkEmail(email: string) {
		try {
			const user = await UsersModel.query().findOne({ email });
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async createUser(body: object) {
		try {
			const user = await UsersModel.query().insert(body).returning("*");
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export default new UsersServices();
