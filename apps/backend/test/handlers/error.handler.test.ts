import { describe, expect, it, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { createMocks } from "node-mocks-http";
import AppError from "../../src/utils/appError";
import errorHandler from "../../src/handlers/error.handler";

describe("errorHandler", () => {
  it("should send error in development mode", () => {
    process.env.NODE_ENV = "development";
    const { req, res } = createMocks<Request, Response>();
    const error = new AppError("Test error", 400);
    const mockNext = vi.fn();
    errorHandler(error, req, res, mockNext);

    const data = JSON.parse(res._getData());
    expect(res._getStatusCode()).toBe(400);
    expect(data.status).toEqual("fail");
    expect(data.message).toEqual("Test error");
    expect(data.stack).toBeDefined();
  });

  it("should send error in production mode if error is operational", () => {
    process.env.NODE_ENV = "production";
    const { req, res } = createMocks<Request, Response>();
    const error = new AppError("Test error", 400);
    const mockNext = vi.fn();
    errorHandler(error, req, res, mockNext);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      status: "fail",
      message: "Test error",
    });
  });

  // it("should send generic error in production mode if error is not operational", () => {
  //   process.env.NODE_ENV = "production";
  //   const { req, res } = createMocks<Request, Response>();
  //   const error = new Error("Test error");
  //   const mockNext = vi.fn();
  //   errorHandler(error, req, res, mockNext);

  //   expect(res._getStatusCode()).toBe(500);
  //   expect(JSON.parse(res._getData())).toEqual({
  //     status: "error",
  //     message: "Something went very wrong!",
  //   });
  // });
});
