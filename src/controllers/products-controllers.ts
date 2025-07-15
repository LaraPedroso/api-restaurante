import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

class ProductsController {
    async index(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            throw new AppError("This is a test error");
            response.json({ message: "Ok" });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
