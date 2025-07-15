import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction
) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return response.status(500).json({ message: err.message });
}
