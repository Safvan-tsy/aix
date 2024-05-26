import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { instill } from "../../index";
import { TriggerUserPipelinePayload } from "instill-sdk";

const resumePipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: TriggerUserPipelinePayload = {
      inputs: [req.body],
    };
    const pipelineResponse = await instill.Pipeline.triggerUserPipelineAction({
      pipelineName: "users/safvan/pipelines/resume_generator",
      payload: payload,
    });
    res.status(200).json({
      status: "success",
      resume: pipelineResponse.outputs,
    });
  }
);

const booleanSearchPipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: TriggerUserPipelinePayload = {
      inputs: [req.body],
    };
    const pipelineResponse = await instill.Pipeline.triggerUserPipelineAction({
      pipelineName: "users/safvan/pipelines/boolean_search_helper",
      payload: payload,
    });

    res.status(200).json({
      status: "success",
      result: pipelineResponse.outputs,
    });
  }
);

export { resumePipeline, booleanSearchPipeline };
