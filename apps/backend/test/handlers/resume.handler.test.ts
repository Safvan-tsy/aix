import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createMocks } from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import puppeteer, { Browser, Page } from "puppeteer";
import * as resumeHelper from "../../src/handlers/helpers/resume.helper";
import {
  generateData,
  generateResume,
} from "../../src/handlers/resume.handler";
import {
  mockParsedData,
  mockRawData,
  mockRefactoredData,
} from "./resume.helper.test";

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
    const spyGetUploadedUrl = vi
      .spyOn(resumeHelper, "getUploadedUrl")
      .mockResolvedValue("https://test.com/imge.jpg");

    // const mockGetUploadedUrl = vi
    //   .fn()
    //   .mockResolvedValue("https://test.image.com");
    // const spyGetUploadedUrl = vi.spyOn(resumeHelper, "getUploadedUrl");
    await generateResume(req, res, mockNext);

    expect(spyGetParsedData).toHaveBeenCalledWith(mockRawData);
    expect(spyGetRefactoredData).toHaveBeenCalledWith(mockParsedData);
    expect(spyGetUploadedUrl).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);

    expect(res._getData()).toEqual({
      resume_url: "https://test.com/imge.jpg",
    });
  });
});
