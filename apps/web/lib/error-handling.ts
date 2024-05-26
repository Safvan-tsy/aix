import { WretchError } from "wretch/types";

export class AuthRequiredError extends Error {
  constructor(message = "Auth is reuired to access this page.") {
    super(message);
    this.name = "AuthRequiredError";
  }
}

export class ResponseError extends Error {
  error: WretchError;
  constructor(message = "Someting went wrong", err: WretchError) {
    super(message);
    this.error = err;
  }
}

export class TimeOutError extends Error {
  constructor(message = "Someting went wrong") {
    super(message);
    this.name = "RequestTimeOut";
  }
}

export const simpleHandleError = (err: WretchError) => {
  console.error(err);
  throw new ResponseError(err.message, err);
};

export const abortRequestError = (err: WretchError) => {
  console.error(err);
  throw new TimeOutError(err.message);
};
