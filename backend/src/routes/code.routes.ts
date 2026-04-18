import { Router } from "express";
import { generateCodeController } from "../controllers/code.controller";

const router = Router();

router.post("/generate", generateCodeController);

export default router;