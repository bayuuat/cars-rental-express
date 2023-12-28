import request from "supertest";
import { describe, it, expect, afterAll, vi } from "vitest";
import app from "../..";
import { UsersModel } from "./users.model";

describe("Test User Module", () => {
	let id: number = 0;
	let token: string = "";

	afterAll(async () => {
		await UsersModel.query().deleteById(id);
		vi.clearAllMocks();
	});

	it("should be able to register", async () => {
		const response = await request(app).post("/api/register").send({ email: "user@binar.com", password: "password123" }).expect("Content-Type", /json/);

		expect(response.status).toBe(201);
		id = response.body.id;
	});

	it("should be able to login", async () => {
		const response = await request(app)
			.post("/api/login")
			.send({ email: "user@binar.com", password: "password123" })
			.expect(200)
			.expect("Content-Type", /json/);

		token = response.body.token;
	});

	it("should be able to see profile", async () => {
		const response = await request(app)
			.get("/api/profile")
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		expect(response.status).toBe(200);
	});

	it("should return 403 for wrong JWT", async () => {
		const response = await request(app)
			.get(`/api/profile`)
			.set({
				Authorization: `Bearer token`,
				Accept: "application/json",
			});

		expect(response.status).toBe(403);
	});

	it("should return 401 for not using JWT token", async () => {
		const response = await request(app)
			.get(`/api/profile`)

		expect(response.status).toBe(401);
	});
});
