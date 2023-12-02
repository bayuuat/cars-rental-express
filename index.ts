import express, { Express } from "express";
import Knex from "knex";
import { Model } from "objection";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./generate-docs";
import * as config from "./knexfile";
import cors from "cors";
import carsRouter from "./features/cars/cars.router";
import userRouter from "./features/users/users.router";

const app: Express = express();
const port = 3000;
const ENV = process.env.NODE_ENV || "development";

// @ts-expect-error getting environtment
const knexInstance = Knex(config[ENV]);

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

app.all("*", (req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
