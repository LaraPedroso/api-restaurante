import { TableSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TableSessionsController();

tablesSessionsRoutes.get("/", tablesSessionsController.index);
tablesSessionsRoutes.post("/", tablesSessionsController.create);
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update);

export { tablesSessionsRoutes };
