import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(data);

    // return next(new AppError('Delete failed , check id', 400))
    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export { generateResume };
