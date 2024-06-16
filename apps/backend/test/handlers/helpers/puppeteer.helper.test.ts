import { describe, it, expect, vi } from "vitest";
import puppeteer, { Browser, Page } from "puppeteer";
import { pdfGenerator } from "../../../src/handlers/helpers/puppeteer.helper";
import * as resumeHelper from "../../../src/handlers/helpers/resume.helper";
import { mockHTMLContent } from "../mockData";


describe("pdfGenerator", () => {
  it("should generate a PDF buffer", async () => {
    const mockData = { name: "Test" };
    const mockPDFBuffer = Buffer.from("PDF content");

    // Create mocks for Puppeteer methods
    const mockSetContent = vi.fn();
    const mockEmulateMediaType = vi.fn();
    const mockPdf = vi.fn().mockResolvedValue(mockPDFBuffer);
    const mockClosePage = vi.fn();
    const mockNewPage = vi.fn().mockResolvedValue({
      setContent: mockSetContent,
      emulateMediaType: mockEmulateMediaType,
      pdf: mockPdf,
      close: mockClosePage,
    } as unknown as Page);
    const mockCloseBrowser = vi.fn();
    const mockLaunch = vi.fn().mockResolvedValue({
      newPage: mockNewPage,
      close: mockCloseBrowser,
    } as unknown as Browser);

    //spy
    const spyGetHTML = vi
      .spyOn(resumeHelper, "getHTMLTemplate")
      .mockReturnValue(mockHTMLContent);
    const spyPuppeteer = vi
      .spyOn(puppeteer, "launch")
      .mockImplementation(mockLaunch);

    const pdf = await pdfGenerator(mockData);

    // Assertions
    expect(puppeteer.launch).toHaveBeenCalled();
    expect(mockNewPage).toHaveBeenCalled();
    expect(resumeHelper.getHTMLTemplate).toHaveBeenCalledWith(mockData);
    expect(mockSetContent).toHaveBeenCalledWith(mockHTMLContent, {
      waitUntil: "domcontentloaded",
    });
    expect(mockEmulateMediaType).toHaveBeenCalledWith("screen");
    expect(mockPdf).toHaveBeenCalledWith({
      format: "A4",
      printBackground: true,
      margin: { top: "50px", right: "40px", bottom: "50px", left: "40px" },
    });
    expect(pdf).toEqual(mockPDFBuffer);

    await mockCloseBrowser();
  });
});
