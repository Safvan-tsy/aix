import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    // return next(new AppError('Delete failed , check id', 400))
    res.status(200).send(data);
  }
);

const pdfGeneratorcatchAsync = catchAsync(async () => {});

export { generateResume };
