import knex from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import z from "zod";

class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query;
            const products = await knex<ProductRepository>("products")
                .select()
                .where("name", "like", `%${name ?? ""}%`)
                .orderBy("name");
            return response.json(products);
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(2),
                price: z
                    .number()
                    .gt(0, { message: "Price must be greater than 0" }),
            });
            const { name, price } = bodySchema.parse(request.body);

            await knex<ProductRepository>("products").insert({ name, price });

            response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
