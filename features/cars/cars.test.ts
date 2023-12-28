import request from "supertest";
import { describe, it, expect, afterAll, vi } from "vitest";
import app from "../..";
import { CarsModel } from "./cars.model";

describe("Test Car Module", () => {
	let id: number = 0;
	let token: string = "";

	afterAll(async () => {
		await CarsModel.query().deleteById(id);
		vi.clearAllMocks();
	});

	it("should get all cars", async () => {
		const response = await request(app).get("/api/cars");

		expect(response.status).toBe(200);
	});

	it("should be able to filter cars", async () => {
		const response = await request(app)
			.get("/api/cars")
			.query({
				passanger: 2,
				type: "Automatic",
			})
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});
		expect(response.status).toBe(200);
	});

	it("should be able to login", async () => {
		const response = await request(app)
			.post("/api/login")
			.send({ email: "agung@binar.com", password: "password123" })
			.expect(200)
			.expect("Content-Type", /json/);

		token = response.body.token;
	});

	it("should be able to add car", async () => {
		const car = {
			plate: "YC71AWH",
			manufacture: "BMW",
			image: "https://res.cloudinary.com/dmozuzltt/image/upload/v1703599672/kc9vhp3bgz6yxj7ekcub.jpg",
			model: "i4",
			type: "Sedan RWD Road Trip Electric",
			description:
				"The i4, especially in RWD spec, is that alternative. It's snug and well-made, while this is a car with the sort of range that should allow almost anyone to do almost any of their road trips.",
			transmission: "Automatic",
			capacity: 6,
			rentPerDay: 1000000,
			availableAt: "2023-12-24T10:47:42.621Z",
			available: true,
			year: 2022,
			options: ["CD (Multi Disc)", "Keyless Entry"],
			specs: ["Rear reading & courtesy lamps", "Zone body construction -inc front/rear crumple zones, hood deformation point"],
		};
		const st = request(app)
			.post("/api/cars")
			.send(car)
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		const response = await st;

		expect(response.status).toBe(201);

		id = response.body.id;
	});

	it("should update a specific item", async () => {
		const updatedItem = { capacity: 4, rentPerDay: 2000000 };
		const response = await request(app)
			.patch(`/api/cars/${id}`)
			.send(updatedItem)
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});

		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({
			message: "Success Edit",
		});
	});

	it("should be able to delete car", async () => {
		const response = await request(app)
			.delete(`/api/cars/${id}`)
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			message: "Success delete car",
		});
	});

	it("should return 404 for a deleted item", async () => {
		const response = await request(app)
			.get(`/api/cars/${id}`)
			.set({
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			});
			
		expect(response.status).toBe(404);
	});
});
