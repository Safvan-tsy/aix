import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { instill } from "../../index";

const resumePipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pipeline = await instill.Pipeline.listUserPipelinesQuery({
      pageSize: 5,
      nextPageToken: null,
      userName: "users/safvan",
      enablePagination: true,
    });
    res.status(200).json(pipeline);
  }
);

export { resumePipeline };
