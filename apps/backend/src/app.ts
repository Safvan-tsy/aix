import express, { Express } from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import AppError from "./utils/appError";
import errorHandler from "./handlers/error.handler";
import { resumeRouter } from "./routers";

const app: Express = express();

const corsOptions = {
  origin: ["*"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cors(corsOptions));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers["content-type"] === "text/plain; charset=utf-8" ||
    req.headers["content-type"] === "text/plain"
  ) {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        console.log(data);
        req.body = JSON.parse(data);
      } catch (err) {
        return next(new AppError("Invalid JSON body", 400));
      }
      next();
    });
  } else {
    next();
  }
});
app.use("/api/resume", resumeRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
