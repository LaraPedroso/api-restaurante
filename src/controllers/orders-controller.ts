import { NextFunction, Request, Response } from "express";
import z from "zod";

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                products_id: z.number(),
                quantity: z.number().int().positive(),
            });
            const { table_session_id, products_id, quantity } =
                bodySchema.parse(request.body);

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
