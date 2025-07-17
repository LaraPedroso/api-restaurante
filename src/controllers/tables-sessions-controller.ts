import knex from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import z from "zod";

class TableSessionsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sessions = await knex<TableSessionRepository>(
                "tables_sessions"
            ).orderBy("closed_at", "desc");

            return response.json(sessions);
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number().int().positive({
                    message: "Table ID must be a positive integer",
                }),
            });

            const { table_id } = bodySchema.parse(request.body);

            const sessions = await knex<TableSessionRepository>(
                "tables_sessions"
            )
                .where("table_id", table_id)
                .orderBy("opened_at", "desc")
                .first();

            if (sessions && !sessions.closed_at) {
                throw new AppError("This table session is already open", 400);
            }

            return response.status(200).json(sessions);
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
                    message: "Invalid session ID",
                })
                .parse(request.params.id);

            const session = await knex<TableSessionRepository>(
                "tables_sessions"
            )
                .where("id", id)
                .first();

            if (!session) {
                throw new AppError("Session not found", 404);
            }

            if (session.closed_at) {
                throw new AppError("This session is already closed", 400);
            }

            const updatedSession = await knex<TableSessionRepository>(
                "tables_sessions"
            )
                .where("id", id)
                .update({ closed_at: knex.fn.now() });

            return response.status(200).json(updatedSession);
        } catch (error) {
            next(error);
        }
    }
}

export { TableSessionsController };
