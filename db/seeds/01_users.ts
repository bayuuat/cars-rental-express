import { Knex } from "knex";
import argon2 from "argon2";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "agung@binar.com",
      password: await argon2.hash("password123"),
    },
    {
      email: "aldi@binar.com",
      password: await argon2.hash("password123"),
    },
  ]);
}
