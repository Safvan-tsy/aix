import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { instill } from "../../index";
import { TriggerUserPipelinePayload } from "instill-sdk";

const refactorData = (data) => {
  data.location = data.locations.split(",");
  data.skills = data.skills.split(",");
  data.social = data.social.split(",");
  delete data.locations;
  if (data.fullName) {
    data.full_name = data.fullName;
    delete data.fullName;
  }

  return data;
};

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

const getResumePipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pipelineResponse = await instill.Pipeline.getUserPipelineQuery({
      pipelineName: "users/safvan/pipelines/resume_generator",
    });
    res.status(200).json({
      status: "success",
      pipeline: {
        name: pipelineResponse.name,
        id: pipelineResponse.id,
        description: pipelineResponse.description,
        readme: pipelineResponse.readme,
      },
    });
  }
);

const booleanSearchPipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // let data = refactorData(req.body);
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

const getBooleanSearchPipeline = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pipelineResponse = await instill.Pipeline.getUserPipelineQuery({
      pipelineName: "users/safvan/pipelines/boolean_search_helper",
    });

    res.status(200).json({
      status: "success",
      pipeline: {
        name: pipelineResponse.name,
        id: pipelineResponse.id,
        description: pipelineResponse.description,
        readme: pipelineResponse.readme,
      },
    });
  }
);
export {
  resumePipeline,
  booleanSearchPipeline,
  getBooleanSearchPipeline,
  getResumePipeline,
};
