import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    data = data[0].replace(/\\n/g, '');
    const parsedData =  JSON.parse(data);  
    res.status(200).send(parsedData);
  }
);
const parseData = (data) => {

  const fullName= data
};

const pdfGeneratorcatchAsync = catchAsync(async () => {});

export { generateResume };
