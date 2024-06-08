import { describe, expect, it } from "vitest";
import AppError from "../../src/utils/appError";


describe("AppError", () => {
  it("should correctly set properties", () => {
    const message = "Test error";
    const statusCode = 400;
    const error = new AppError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
  });

  it("should set status to 'error' for 5xx status codes", () => {
    const error = new AppError("Server error", 500);
    expect(error.status).toBe("error");
  });
});