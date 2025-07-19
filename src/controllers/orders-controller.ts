import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import knex from "knex";
import z from "zod";

class OrdersController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params;
            const order = await knex("orders")
                .select(
                    "orders.id",
                    "orders.table_session_id",
                    "orders.product_id",
                    "products.name",
                    "orders.price",
                    "orders.quantity"
                )
                .join("products", "products.id", "orders.product_id")
                .where({ table_session_id });
        } catch (error) {}
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number().int().positive(),
            });
            const { table_session_id, product_id, quantity } = bodySchema.parse(
                request.body
            );

            const session = await knex<TableSessionRepository>(
                "tables_sessions"
            )
                .where("id", table_session_id)
                .first();

            if (!session) {
                throw new AppError("Table session not found");
            }

            if (session.closed_at) {
                throw new AppError("Table session is already closed");
            }

            const product = await knex<ProductRepository>("products")
                .where("id", product_id)
                .first();

            if (!product) {
                throw new AppError("product not found");
            }

            await knex<OrderRepository>("orders").insert({
                product_id,
                table_session_id,
                quantity,
                price: product.price,
            });

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
