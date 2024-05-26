import { simpleHandleError } from "./error-handling";
import { ServerApi } from "./wretch";

async function postReq(payload: Object, url: string) {
  return await ServerApi.post(payload, url)
    .badRequest(simpleHandleError)
    .unauthorized(simpleHandleError)
    .forbidden(simpleHandleError)
    .notFound(simpleHandleError)
    .timeout(simpleHandleError)
    .internalError(simpleHandleError)
    .error(418, (err) => {
      console.error(err);
      throw new Error(`Something went wrong`);
    })
    .fetchError(simpleHandleError)
    .json();
}

export { postReq };
