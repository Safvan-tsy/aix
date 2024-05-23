import { NextFunction, Request, Response } from "express";
import puppeteer from "puppeteer";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResponse } from "../types/cloudinary";
import { UserDataType } from "../types/user";
import { instill } from "../../index";

const resumePipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pipeline = await instill.Pipeline.listUserPipelinesQuery({
      pageSize: 5,
      nextPageToken: "1",
      userName: "safvan",
      enablePagination: true,
    });
    res.status(200).json(pipeline);
  }
);

export { resumePipeline };
