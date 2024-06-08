import { Request, Response, NextFunction } from "express";
import { describe, expect, it, vi } from "vitest";
import { createMocks } from "node-mocks-http";
import catchAsync from "../../src/utils/catchAsync";

describe("catchAsync", () => {
  it("should call next with error if promise rejects", async () => {
    const { req, res } = createMocks<Request, Response>();
    const mockNext = vi.fn();

    const error = new Error("Test error");
    const testfn = catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        throw error;
      }
    );

    await testfn(req, res, mockNext);

    expect(mockNext.mock.calls.length).toBe(1);
    expect(mockNext.mock.calls[0][0]).toBe(error);
  });
});
