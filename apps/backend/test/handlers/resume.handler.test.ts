import { afterEach, describe, expect, it, vi } from "vitest";
import { createMocks } from "node-mocks-http";
import { Request, Response } from "express";
import * as resumeHelper from "../../src/handlers/helpers/resume.helper";
import {
  generateData,
  generateResume,
} from "../../src/handlers/resume.handler";
import { mockParsedData, mockRawData, mockRefactoredData } from "./mockData";

afterEach(() => {
  vi.clearAllMocks();
});

describe("generateData", () => {
  it("should respond with resume data", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "POST",
      body: mockRawData,
    });
    const spyGetParsedData = vi
      .spyOn(resumeHelper, "getParsedData")
      .mockReturnValue(mockParsedData);
    const spyGetRefactoredData = vi
      .spyOn(resumeHelper, "getRefactoredData")
      .mockReturnValue(mockRefactoredData);

    await generateData(req, res, mockNext);

    expect(resumeHelper.getParsedData).toHaveBeenCalledWith(mockRawData);
    expect(resumeHelper.getRefactoredData).toHaveBeenCalledWith(mockParsedData);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockRefactoredData);

    spyGetParsedData.mockRestore();
    spyGetRefactoredData.mockRestore();
  });
});

describe("generateResume", () => {
  it("should respond with resume pdf", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "POST",
      body: mockRawData,
    });
    const spyGetParsedData = vi
      .spyOn(resumeHelper, "getParsedData")
      .mockReturnValue(mockParsedData);
    const spyGetRefactoredData = vi
      .spyOn(resumeHelper, "getRefactoredData")
      .mockReturnValue(mockRefactoredData);
    const mockExpectedResponse = { resume_url: "https://test.com/imge.jpg" };
    const spyGetUploadedUrl = vi
      .spyOn(resumeHelper, "getUploadedUrl")
      .mockImplementation(async () => {
        return Promise.resolve(mockExpectedResponse.resume_url);
      });

    await generateResume(req, res, mockNext);

    expect(spyGetParsedData).toHaveBeenCalledWith(mockRawData);
    expect(spyGetRefactoredData).toHaveBeenCalledWith(mockParsedData);
    expect(spyGetUploadedUrl).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
});
