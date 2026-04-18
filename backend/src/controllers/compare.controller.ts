import { Request, Response, NextFunction } from "express";
import { compareArchitectures } from "../services/compare.service";
import { successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export const compare = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.prompt) {
      throw new ApiError(400, "VALIDATION_ERROR", "Prompt required");
    }

    const result = await compareArchitectures(req.body);

    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
};