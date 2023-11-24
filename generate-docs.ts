import SwaggerJSDOC from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Binar Car Rentals",
    version: "1.0.0",
    description: "Car Rental Binar made by Bayu Aditya T",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./features/**/*.docs.yaml"], 
};

export const swaggerSpec = SwaggerJSDOC(options);
