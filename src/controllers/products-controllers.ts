import { NextFunction, Request, Response } from "express";
import z from "zod";
import knex from "@/database/knex";

import { AppError } from "@/utils/AppError";
class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query;
            const products = await knex<ProductRepository>("products")
                .select()
                .where("name", "like", `%${name ?? ""}%`);
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

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {
                    message: "Invalid product ID",
                })
                .parse(request.params.id);

            const bodySchema = z.object({
                name: z.string().trim().min(2),
                price: z
                    .number()
                    .gt(0, { message: "Price must be greater than 0" }),
            });
            const { name, price } = bodySchema.parse(request.body);

            const product = await knex<ProductRepository>("products")
                .select()
                .where("id", id)
                .first();

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            await knex<ProductRepository>("products")
                .update({ name, price, updated_at: knex.fn.now() })
                .where("id", id);

            return response.json();
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), {
                    message: "Invalid product ID",
                })
                .parse(request.params.id);

            const product = await knex<ProductRepository>("products")
                .select()
                .where("id", id)
                .first();

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            await knex<ProductRepository>("products").where("id", id).delete();

            return response.status(204).json();
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
