import { Router } from "express";
import { compare } from "../controllers/compare.controller";

const router = Router();

router.post("/", compare);

export default router;