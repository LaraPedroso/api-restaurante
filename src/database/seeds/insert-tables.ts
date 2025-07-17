import { table } from "console";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("tables").del();

    await knex("tables").insert([
        { table_number: 1, created_at: new Date(), updated_at: new Date() },
        { table_number: 2, created_at: new Date(), updated_at: new Date() },
        { table_number: 3, created_at: new Date(), updated_at: new Date() },
        { table_number: 4, created_at: new Date(), updated_at: new Date() },
        { table_number: 5, created_at: new Date(), updated_at: new Date() },
        { table_number: 6, created_at: new Date(), updated_at: new Date() },
        { table_number: 7, created_at: new Date(), updated_at: new Date() },
        { table_number: 8, created_at: new Date(), updated_at: new Date() },
        { table_number: 9, created_at: new Date(), updated_at: new Date() },
        { table_number: 10, created_at: new Date(), updated_at: new Date() },
    ]);
}
