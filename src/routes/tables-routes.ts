import { TablesController } from "@/controllers/tables-controller";
import { Router } from "express";

const tablesRoutes = Router();

const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);
tablesRoutes.post("/", tablesController.create);
tablesRoutes.put("/:id", tablesController.update);
tablesRoutes.delete("/:id", tablesController.delete);

export { tablesRoutes };
