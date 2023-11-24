import express, { Express } from "express";
import { UsersController } from "./features/users/users.controller";
import Knex from "knex";
import { Model } from "objection";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./generate-docs";
import { CarsController } from "./features/cars/cars.controller";
import * as config from "./knexfile";

const app: Express = express();
const port = 3000;
const ENV = process.env.NODE_ENV || "development";

// @ts-expect-error getting environtment
const knexInstance = Knex(config[ENV]);

Model.knex(knexInstance);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/docs", UISwaggerExpress.serve, UISwaggerExpress.setup(swaggerSpec));

new UsersController(app).init();
new CarsController(app).init();

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
