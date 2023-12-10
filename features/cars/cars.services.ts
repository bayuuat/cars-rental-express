import { CarsModel } from "./cars.model";
import { Request } from "express";

class CarsServices {
	public async getCars(req: Request) {
		const { type, date, time, passanger } = req.query;
		const qCars = CarsModel.query();

		if (passanger) {
			qCars.where("capacity", ">=", `${passanger}`);
		}
		if (date) {
			const waktu = `${date} ${time}`;
			qCars.where("availableAt", ">=", `${waktu}`);
		}
		if (type) {
			qCars.where("transmission", "=", `${type}`);
		}

		const cars = await qCars;
		return cars.sort((a, b) => a.id - b.id);
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
