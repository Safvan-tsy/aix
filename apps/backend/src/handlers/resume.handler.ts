import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
  getParsedData,
  getRefactoredData,
  getUploadedUrl,
} from "./helpers/resume.helper";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    const parsedData = await getParsedData(data);
    const refactoredData = getRefactoredData(parsedData);
    const pdf = await getUploadedUrl(refactoredData);

    res.status(200).json({ resume_url: pdf });
  }
);

const generateData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = await getParsedData(req.body);
    const refactoredData = getRefactoredData(parsedData);

    res.status(200).json(refactoredData);
  }
);

export { generateData, generateResume };
