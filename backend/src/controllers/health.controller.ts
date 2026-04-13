import { Request, Response } from "express";

export const getHealth = async (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      api: "ok",
      db: "ok", // later dynamic
      ai: "ok", // later dynamic
    },
    version: "1.0.0",
  });
};