import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "postgresql",
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
		connection: {
			host: process.env.DB_HOST,
			port: 5432,
			user: process.env.DB_USER,
			database: process.env.DB_DATABASE,
			password: process.env.DB_PASSWORD,
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
};

module.exports = config;
