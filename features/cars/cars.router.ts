import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth";
import carsController from "./cars.controller";

const carsRouter = Router();

carsRouter.get("/", carsController.index);
carsRouter.get("/cars", carsController.getAll);
carsRouter.post("/cars", authenticateToken, carsController.create);
carsRouter.get("/cars/:id", authenticateToken, carsController.getOne);
carsRouter.patch("/cars/:id", authenticateToken, carsController.patch);
carsRouter.delete("/cars/:id", authenticateToken, carsController.delete);

export default carsRouter;
