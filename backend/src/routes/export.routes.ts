import { Router } from "express";
import { exportJsonController } from "../controllers/export.controller";

const router = Router();

router.get("/json/:diagramId", exportJsonController);

export default router;