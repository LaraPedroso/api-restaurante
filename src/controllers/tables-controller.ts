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
}

export { TablesController };
