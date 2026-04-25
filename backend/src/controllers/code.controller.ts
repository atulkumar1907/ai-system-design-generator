import { Request, Response, NextFunction } from "express";
import { generateCode } from "../services/code.service";
import { successResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const generateCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { language, architecturePattern } = req.body;

    if (!language || !architecturePattern) {
      throw new ApiError(400, "VALIDATION_ERROR", "Missing fields");
    }

    const result = await generateCode(req.body);

    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
};