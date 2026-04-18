import express from "express";
import healthRoutes from "./routes/health.routes";
import diagramRoutes from "./routes/diagram.routes"
import { errorResponse } from "./utils/ApiResponse";
import generateRoutes from "./routes/ai.routes";
import compareRoutes from "./routes/compare.routes";
import codeRoutes from "./routes/code.routes";
import exportRoutes from "./routes/export.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/diagrams", diagramRoutes);
app.use("/api/v1/generate", generateRoutes);
app.use("/api/v1/compare", compareRoutes);
app.use("/api/v1/code", codeRoutes);
app.use("/api/v1/export", exportRoutes);



app.use((err: any, req: any, res: any, next: any) => {
  const status = err.statusCode || 500;
  res.status(status).json(errorResponse(err));
});

export default app;