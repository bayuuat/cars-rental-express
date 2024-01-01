import express, { Express } from "express";
import Knex from "knex";
import { Model } from "objection";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./generate-docs";
import knexConfig from "./knexfile";
import dotenv from "dotenv";
import cors from "cors";
import carsRouter from "./features/cars/cars.router";
import userRouter from "./features/users/users.router";
import xenditRouter from "./features/xendit/xendit.router";

dotenv.config();

const app: Express = express();
const ENV = process.env.NODE_ENV || "development";

const knexInstance = Knex(knexConfig[ENV]);

Model.knex(knexInstance);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/docs", UISwaggerExpress.serve, UISwaggerExpress.setup(swaggerSpec));

app.get("/", (req, res) => {
	res.status(200).json({ welcome: "Rental Cars API", docs: "/docs" });
});

app.use("/api", carsRouter);
app.use("/api", userRouter);
app.use("/api/xendit", xenditRouter);

app.all("*", (req, res) => {
	res.status(404).json({ error: "Route not found" });
});

export default app;
