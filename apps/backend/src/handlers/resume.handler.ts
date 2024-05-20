import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    console.log(data);
    // data = data[0].replace(/\\n/g, "");
    // const parsedData = JSON.parse(data);
    const parsedData = parseData(data);
    res.status(200).send(parsedData);
  }
);
const refactorData = (data) => {
  const fullName = data;
};
const parseData = (data) => {
  return JSON.parse(data[0].replace(/\\n/g, ""));
};

const pdfGeneratorcatchAsync = catchAsync(async () => {});

export { generateResume };
