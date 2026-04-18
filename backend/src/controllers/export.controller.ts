import { Request, Response, NextFunction } from "express";
import { exportJSON } from "../services/export.service";
import { successResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export const exportJsonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.diagramId) {
      throw new ApiError(400, "VALIDATION_ERROR", "diagramId required");
    }

    const result = await exportJSON(req.params.diagramId);

    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
};