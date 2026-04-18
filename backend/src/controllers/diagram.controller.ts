import { Request, Response, NextFunction } from "express";
import * as service from "../services/diagram.service.js"; // Remember the .js extension for NodeNext
import { ApiError } from "../utils/ApiError";

export const getDiagram = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Explicitly validate that id exists and is a string
    if (typeof id !== "string") {
      throw new ApiError(
        400,
        "VALIDATION_ERROR",
        "Invalid or missing Diagram ID",
      ); // [cite: 88]
    }

    const data = await service.getDiagramService(id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createDiagram = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Explicitly validate that id exists and is a string
    if (typeof id !== "string") {
      throw new ApiError(
        400,
        "VALIDATION_ERROR",
        "Invalid or missing Diagram ID",
      ); // [cite: 88]
    }

    const data = await service.createDiagramService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateDiagram = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new ApiError(400, "VALIDATION_ERROR", "Invalid ID"); // [cite: 88]
    }

    const data = await service.updateDiagramService(id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteDiagram = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new ApiError(400, "VALIDATION_ERROR", "Invalid ID"); // [cite: 88]
    }

    await service.deleteDiagramService(id);
    res.json({ success: true }); // [cite: 32]
  } catch (error) {
    next(error);
  }
};

export const listDiagrams = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = {
      page: req.query.page ? Number(req.query.page) : 1, //
      limit: req.query.limit ? Number(req.query.limit) : 20, //
      arch: req.query.arch as string,
      search: req.query.search as string,
      sort: (req.query.sort as string) || "createdAt", //
    };

    const data = await service.listDiagramsService(query);
    res.json({ success: true, data }); // [cite: 28]
  } catch (error) {
    next(error);
  }
};
