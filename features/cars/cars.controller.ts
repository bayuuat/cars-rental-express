import { Response, Request } from "express";
import { ValidationError } from "objection";
import { Cars, CarsModel } from "./cars.model";
import CarsServices from "./cars.services";

class CarsController {
	public async index(req: Request, res: Response) {
		try {
			const cars = await CarsServices.getCars(req);
			return res.render("index", { cars });
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: "Internal Server Error" });
		}
	}

	public async getAll(req: Request, res: Response) {
		try {
			const cars = await CarsServices.getCars(req);
			return res.status(200).send(cars);
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: "Internal Server Error" });
		}
	}

	public async getOne(req: Request, res: Response) {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return res.status(400).send({ message: "Invalid id format. Must be a number." });
		}
		const car = await CarsServices.findCar(id);
		if (car) {
			res.status(200).send(car);
		} else {
			res.status(400).send({ message: "Car not found" });
		}
	}

	public async create(req: Request<unknown, unknown, Cars, unknown>, res: Response) {
		try {
			const body = {
				...req.body,
				specs: JSON.stringify(req.body.specs),
				options: JSON.stringify(req.body.specs),
			};
			const car = await CarsServices.createCar(body);
			return res.status(201).send(car);
		} catch (error) {
			console.error(error);
			if (error instanceof ValidationError) {
				return res.status(400).send({ error: error.message });
			}
			return res.status(500).send({ error: error });
		}
	}

	public async patch(req: Request, res: Response) {
		try {
			const body = {
				...req.body,
				specs: JSON.stringify(req.body.specs),
				options: JSON.stringify(req.body.specs),
			};
			const { id } = req.params;

			if (isNaN(Number(id))) {
				return res.status(400).send({ message: "Invalid id format. Must be a number." });
			}

			const car = await CarsServices.findCar(id);

			if (!car) {
				return res.status(400).send({ message: "Car not found" });
			}

			const result = await CarsServices.updateCar(id, body);
			if (result) {
				return res.status(201).send("Success Edit");
			}
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: error });
		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (isNaN(Number(id))) {
				return res.status(400).send({ message: "Invalid id format. Must be a number." });
			}
			const car = await CarsModel.query().findById(id);

			if (!car) {
				return res.status(404).send({ message: "Car not found" });
			}

			const result = await CarsServices.deleteCar(id);
			if (result) {
				return res.status(200).send({ message: "Success delete car" });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: error });
		}
	}
}

export default new CarsController();
