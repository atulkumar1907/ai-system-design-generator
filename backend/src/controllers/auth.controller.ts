import { Request, Response, NextFunction } from "express";
import * as service from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const data = await service.registerService(name, email, password);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const data = await service.loginService(email, password);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.userId is set by the auth middleware
    const data = await service.getMeService((req as any).userId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};