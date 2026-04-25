import { Request, Response, NextFunction } from "express";
import { generateArchitecture } from "../services/ai.service";
import { successResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { v4 as uuid } from "uuid";

export const generate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt, architectureTypes } = req.body;

    if (!prompt || !architectureTypes) {
      throw new ApiError(400, "VALIDATION_ERROR", "Missing required fields");
    }

    const architectures = await generateArchitecture(req.body);

    res.json(
      successResponse({
        sessionId: uuid(),
        prompt,
        generatedAt: new Date().toISOString(),
        architectures,
      })
    );
  } catch (error) {
    next(error);
  }
};