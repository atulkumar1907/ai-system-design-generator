import { Router } from "express";
import * as controller from "../controllers/diagram.controller";

const router = Router();

router.get("/", controller.listDiagrams);
router.post("/", controller.createDiagram);
router.get("/:id", controller.getDiagram);
router.put("/:id", controller.updateDiagram);
router.delete("/:id", controller.deleteDiagram);

export default router;