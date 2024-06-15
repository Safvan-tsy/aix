import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMocks } from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import puppeteer, { Browser, Page } from "puppeteer";
import * as resumeHelper from "../../../src/handlers/helpers/resume.helper";
import * as cloudinaryHelper from "../../../src/handlers/helpers/cloudinary.helper";
import * as puppeteerHelper from "../../../src/handlers/helpers/puppeteer.helper";
import { CloudinaryUploadResponse } from "../../../src/types/cloudinary";
import { mockParsedData, mockRawData, mockRefactoredData } from "../mockData";

afterEach(() => {
  vi.clearAllMocks();
});

describe("getParsedData", () => {
  it("should parse string to json and remove \n char", () => {
    expect(resumeHelper.getParsedData(mockRawData)).toEqual(mockParsedData);
  });
});

describe("getRefactoredData", () => {
  it("should return refactored data", () => {
    expect(resumeHelper.getRefactoredData(mockParsedData)).toEqual(
      mockRefactoredData
    );
  });
  it("should return refactored data even if education and experience is not array", () => {
    let dataToRefactor: any = mockParsedData;
    dataToRefactor.education = {
      institution: "Farook College Kozhikode",
      duration: "2020-2023",
      course_name: "B.Voc In Software Development",
      description:
        "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
    };

    expect(resumeHelper.getRefactoredData(dataToRefactor)).toEqual(
      mockRefactoredData
    );
  });
  it("should return educationexperience as array of objects ", () => {
    let dataToRefactor: any = mockParsedData;
    dataToRefactor.education = {
      education: [
        {
          institution: "Farook College Kozhikode",
          duration: "2020-2023",
          course_name: "B.Voc In Software Development",
          description:
            "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
        },
      ],
    };
    const result = resumeHelper.getRefactoredData(dataToRefactor);
    expect(result.education).toEqual([
      {
        institution: "Farook College Kozhikode",
        duration: "2020-2023",
        course_name: "B.Voc In Software Development",
        description:
          "Focused three-year Software Development degree at Farook College Kozhikode, exploring Data Structures, Algorithms, web development, and coding in C, Java, Python, and .NET. Achieved a commendable 75.7% CGPA.",
      },
    ]);
  });
});

describe("capitalizeFirstLetterOfEachWord", () => {
  it("it should return string with first letter of each word as capital", () => {
    expect(
      resumeHelper.capitalizeFirstLetterOfEachWord("software developer")
    ).toBe("Software Developer");
  });
});

describe("getUploadedUrl", () => {
  it("it should return uploaded url", async () => {
    const mockUrl = "test.com/img.jpg";
    const mockPdfBuffer = Buffer.from("");
    const mockCloudinaryUploadResponse = {
      url: mockUrl,
      public_id: "some_public_id",
      secure_url: mockUrl,
    } as CloudinaryUploadResponse;

    const spyPdfGenerator = vi
      .spyOn(puppeteerHelper, "pdfGenerator")
      .mockResolvedValue(mockPdfBuffer);

    const spyUploadCloudinary = vi
      .spyOn(cloudinaryHelper, "uploadPdfToCloudinary")
      .mockResolvedValue(mockCloudinaryUploadResponse);

    const result = await resumeHelper.getUploadedUrl(mockRefactoredData);
    expect(spyPdfGenerator).toHaveBeenCalled();
    expect(spyUploadCloudinary).toHaveBeenCalled();
    expect(result).toBe(mockUrl);
  });
});
