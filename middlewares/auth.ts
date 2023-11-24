import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { Users } from "../features/users/users.model";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	const privateKey = fs.readFileSync("./key/key");

	if (!token) {
		return res.status(401).json({ message: "Unauthorized: Missing token" });
	}

	try {
		jwt.verify(token, privateKey, (err, user) => {
			if (err) {
				return res.status(403).json({ message: "Unauthorized: Invalid token" });
			}
			req.user = user as Users;
			next();
		});
	} catch (error) {
		console.error(error);
		return res.status(401).json({ message: "Unauthorized: Invalid token" });
	}
}
