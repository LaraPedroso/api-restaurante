import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction
) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        return response.status(400).json({
            message: "Validation error",
            issues: err.format(),
        });
    }

    console.error(err);
    return response.status(500).json({ message: err.message });
}
