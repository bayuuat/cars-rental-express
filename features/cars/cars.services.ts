import { Redis } from "ioredis";
import { CarsModel } from "./cars.model";
import { Request } from "express";

const redis = new Redis();

export class CarsServices {
	async getCars(req: Request) {
		const { manufacture, model, type } = req.query;
		const key = `cars:${JSON.stringify(req.query)}`;
		const carsCache = await redis.getex(key);

		if (carsCache) {
			return carsCache;
		} else {
			const qCars = CarsModel.query();

			if (manufacture) {
				qCars.where("manufacture", "like", `%${manufacture}%`);
			}
			if (model) {
				qCars.where("model", "like", `%${model}%`);
			}
			if (type) {
				qCars.where("type", "like", `%${type}%`);
			}

			const cars = await qCars;
			await redis.setex(key, 10, JSON.stringify(cars));
			return cars;
		}
	}

	async findCar(id: string) {
		try {
			const car = await CarsModel.query().findById(id);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async createCar(body: object) {
		try {
			const car = await CarsModel.query().insert(body).returning("*");
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async updateCar(id: string, body: object) {
		try {
			const car = await CarsModel.query().findById(id).patch(body);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async deleteCar(id: string) {
		try {
			const car = await CarsModel.query().deleteById(id);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
