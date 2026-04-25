import { Request, Response, NextFunction } from "express";
import { exportJSON } from "../services/export.service";
import { successResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const exportJsonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.diagramId) {
      throw new ApiError(400, "VALIDATION_ERROR", "diagramId required");
    }

    const result = await exportJSON(req.params.diagramId as string);

    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
};