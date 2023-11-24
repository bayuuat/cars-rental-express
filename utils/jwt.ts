import jwt from "jsonwebtoken";
import fs from "fs";

export const createJwtToken = ( payload: object ) => {
	const privateKey = fs.readFileSync("./key/key");
	const token = jwt.sign(payload, privateKey, {
		expiresIn: "1h", // token will expire in one hour
	}); // an hour
	return token;
};
