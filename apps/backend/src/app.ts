import express, { Express } from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import AppError from "./utils/appError";
import errorHandler from "./handlers/error.handler";
import { resumeRouter, pipelineRouter } from "./routers";

const app: Express = express();

const corsOptions = {
  origin: ["*"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors(corsOptions));
app.use("/api/resume", resumeRouter);
app.use("/api/pipeline", pipelineRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
