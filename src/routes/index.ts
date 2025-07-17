import { Router } from "express";
import { productsRouter } from "./products-routes";
import { tablesRoutes } from "./tables-routes";

const routes = Router();
routes.use("/products", productsRouter);
routes.use("/tables", tablesRoutes);

export { routes };
