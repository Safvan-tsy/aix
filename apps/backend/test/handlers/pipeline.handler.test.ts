import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextFunction, Request, Response } from "express";
import { createMocks } from "node-mocks-http";
import {
  booleanSearchPipeline,
  getBooleanSearchPipeline,
  getResumePipeline,
  resumePipeline,
} from "../../src/handlers/pipeline.handler";
import { mockPipelineRequestBody, mockResumePipelineData } from "./mockData";
import { instill } from "../../index";

beforeEach(() => {
  vi.mock("../../index", () => ({
    instill: {
      Pipeline: {
        getUserPipelineQuery: vi.fn(),
        triggerUserPipelineAction: vi.fn(),
      },
    },
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("ResumePipeline", () => {
  it("should get Resume Pipeline data from instill hub", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "GET",
    });

    (instill.Pipeline.getUserPipelineQuery as any).mockResolvedValue(
      mockResumePipelineData
    );
    // const spyInstill = vi
    //   .spyOn(instill.Pipeline, "getUserPipelineQuery")
    //   .mockResolvedValue(mockResumePipelineData as any);
    await getResumePipeline(req, res, mockNext);

    // const responseData = res._getJSONData();
    expect(instill.Pipeline.getUserPipelineQuery).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
  it("should trigger resume Pipeline Action", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "GET",
    });

    (instill.Pipeline.triggerUserPipelineAction as any).mockResolvedValue({
      resume_url: "test.com/img.jpg",
    });

    await resumePipeline(req, res, mockNext);

    expect(instill.Pipeline.triggerUserPipelineAction).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
});

describe("booleanSearchPipeline", () => {
  it("should get BooleanSearch Pipeline data from instill hub", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "POST",
      body: mockPipelineRequestBody,
    });
    (instill.Pipeline.getUserPipelineQuery as any).mockResolvedValue(
      mockResumePipelineData
    );

    await getBooleanSearchPipeline(req, res, mockNext);

    expect(instill.Pipeline.getUserPipelineQuery).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
  it("should trigger boolea search Pipeline Action", async () => {
    const mockNext = vi.fn();
    const { req, res } = createMocks<Request, Response>({
      method: "POST",
      body: mockPipelineRequestBody,
    });

    (instill.Pipeline.triggerUserPipelineAction as any).mockResolvedValue({
      resume_url: "test.com/img.jpg",
    });
    await booleanSearchPipeline(req, res, mockNext);

    expect(instill.Pipeline.triggerUserPipelineAction).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);
  });
});
