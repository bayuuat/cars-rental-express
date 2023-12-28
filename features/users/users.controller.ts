import { Request, Response } from "express";
import { Users } from "./users.model";
import argon2 from "argon2";
import { createJwtToken } from "../../utils/jwt";
import { NotFoundError } from "objection";
import usersServices from "./users.services";

class UsersController {
	public async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body as Omit<Users, "id">;
			const user = await usersServices.checkEmail(email);

			if (user && await argon2.verify(user.password, password)) {
				const token = createJwtToken({ email: user.email, id: user.id });
				return res.status(200).json({ token });
			}
			return res.status(400).json({ message: "Wrong credentials" });
		} catch (error) {
			console.error(error);
			if (error instanceof NotFoundError) {
				return res.status(404).json({ message: "User not found!" });
			}
			return res.status(500).json({ error });
		}
	}

	public async profile(req: Request, res: Response) {
		try {
			return res.status(200).json(req.user);
		} catch (error) {
			console.error(error);
			if (error instanceof NotFoundError) {
				return res.status(404).json({ message: "User not found!" });
			}
			return res.status(500).json({ error: error });
		}
	}

	public async register(req: Request, res: Response) {
		try {
			const { email, password } = req.body as Omit<Users, "id">;
			const user = await usersServices.checkEmail(email);

			if (user) {
				return res.status(400).json({ message: "Email already registered!" });
			}

			const hashedPass = await argon2.hash(password);
			const result = await usersServices.createUser({ email: email, password: hashedPass });

			if (!result) {
				return res.status(500).json({ message: "Error when creating register!" });
			}

			return res.status(201).json(result);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: error });
		}
	}
}

export default new UsersController();
