import { CarsModel } from "./cars.model";
import { Request } from "express";

class CarsServices {
	public async getCars(req: Request) {
		const { manufacture, model, type } = req.query;
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
		return cars;
	}

	public async findCar(id: string) {
		try {
			const car = await CarsModel.query().findById(id);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async createCar(body: object) {
		try {
			const car = await CarsModel.query().insert(body).returning("*");
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async updateCar(id: string, body: object) {
		try {
			const car = await CarsModel.query().findById(id).patch(body);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async deleteCar(id: string) {
		try {
			const car = await CarsModel.query().deleteById(id);
			return car;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export default new CarsServices();
