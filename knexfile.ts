import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: {
      database: "my_db",
      user: "username",
      password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},

	production: {
		client: "pg",
		connection: process.env.DB_CONNECTION,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},
};

export = config;
