import { abortRequestError, simpleHandleError } from "@/lib/error-handling";
import { ServerApi } from "@/lib/wretch";

export interface PipelineData {
  status: string;
  pipeline: {
    name: string;
    id: string;
    description: string;
    readme: string;
  };
}
export const useGetResumePipeline = async () => {
    console.log(ServerApi)
  const resumePipeline = await ServerApi.url(`/pipeline/resume`)
    .get()
    .setTimeout(75000)
    .badRequest(simpleHandleError)
    .unauthorized(simpleHandleError)
    .forbidden(simpleHandleError)
    .notFound(simpleHandleError)
    .timeout(abortRequestError)
    .internalError(simpleHandleError)
    .error(418, (err) => {
      console.error(err);
      throw new Error(`Something went wrong`);
    })
    .fetchError(simpleHandleError)
    .json<PipelineData>();

  return { resumePipeline };
};

export const useGetBooleanPipeline = async () => {
  const booleanPipeline = await ServerApi.url(`/boolean`)
    .get()
    .setTimeout(75000)
    .badRequest(simpleHandleError)
    .unauthorized(simpleHandleError)
    .forbidden(simpleHandleError)
    .notFound(simpleHandleError)
    .timeout(abortRequestError)
    .internalError(simpleHandleError)
    .error(418, (err) => {
      console.error(err);
      throw new Error(`Something went wrong`);
    })
    .fetchError(simpleHandleError)
    .json<PipelineData>();

  return { booleanPipeline };
};
