import { Users } from "../features/users/users.model";

declare module "express" {
	export interface Request {
		user?: Users;
	}
}
