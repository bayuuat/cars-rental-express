import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
	id!: number;
	plate!: string;
	manufacture!: string;
	image!: string;
	model!: string;
	type!: string;
	description!: string;
	transmission!: string;
	capacity!: number;
	rentPerDay!: number;
	availableAt!: string;
	available!: boolean;
	year!: number;
	options!: string;
	specs!: string;

	static get tableName() {
		return "cars";
	}

  static get jsonSchema() {
    return {
      type: "object",
      required: ["plate", "model"],
      properties: {
        plate: { type: "string", minLength: 5 },
        model: { type: "string", minLength: 1 },
        rentPerDay: { type: "number", minimum: 300_000 },
      },
    };
  }
}

export type Cars = ModelObject<CarsModel>;
