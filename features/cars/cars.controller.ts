import { Express, Response, Request } from "express";
import { ValidationError } from "objection";
import { Cars, CarsModel } from "./cars.model";
import { authenticateToken } from "../../middlewares/auth";
import { CarsServices } from "./cars.services";

export class CarsController {
	app: Express;
	private carsServices: CarsServices;

	constructor(app: Express) {
		this.app = app;
		this.carsServices = new CarsServices();
	}

	init() {
		this.app.get("/", this.index.bind(this));
		this.app.get("/cars", authenticateToken, this.getAll.bind(this));
		this.app.post("/cars", authenticateToken, this.create.bind(this));
		this.app.get("/cars/:id", authenticateToken, this.getOne.bind(this));
		this.app.patch("/cars/:id", authenticateToken, this.patch.bind(this));
		this.app.delete("/cars/:id", authenticateToken, this.delete.bind(this));
	}

	async index(req: Request, res: Response) {
		try {
			const cars = await this.carsServices.getCars(req);
			return res.render("index", { cars });
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: 'Internal Server Error' });
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const cars = await this.carsServices.getCars(req);
			return res.status(200).send(cars);
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: 'Internal Server Error' });
		}
	}

	async getOne(req: Request, res: Response) {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return res.status(400).send({ message: "Invalid id format. Must be a number." });
		}
		const car = await this.carsServices.findCar(id);
		if (car) {
			res.status(200).send(car);
		} else {
			res.status(400).send({ message: "Car not found" });
		}
	}

	async create(req: Request<unknown, unknown, Cars, unknown>, res: Response) {
		try {
			const body = {
				...req.body,
				specs: JSON.stringify(req.body.specs),
				options: JSON.stringify(req.body.specs),
			};
			const car = await this.carsServices.createCar(body);
			return res.status(201).send(car);
		} catch (error) {
			console.error(error);
			if (error instanceof ValidationError) {
				return res.status(400).send({ error: error.message });
			}
			return res.status(500).send({ error: error });
		}
	}

	async patch(req: Request, res: Response) {
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

			const car = await this.carsServices.findCar(id);

			if (!car) {
				return res.status(400).send({ message: "Car not found" });
			}

			const result = await this.carsServices.updateCar(id, body);
			return res.status(200).send(result);
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: error });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			if (isNaN(Number(id))) {
				return res.status(400).send({ message: "Invalid id format. Must be a number." });
			}
			const car = await CarsModel.query().findById(id);

			if (!car) {
				return res.status(400).send({ message: "Car not found" });
			}

			const result = await this.carsServices.deleteCar(id);
			return res.status(200).send(result);
		} catch (error) {
			console.error(error);
			return res.status(500).send({ error: error });
		}
	}
}
