import knex from "@/database/knex";
import { NextFunction, Request, Response } from "express";

class TablesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables").select();

            return response.json(tables);
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            response.send("Table created");
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
        const { id } = request.params;
        response.send(`Table ${id} updated`);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
        const { id } = request.params;
        response.send(`Table ${id} deleted`);
    }
}

export { TablesController };
