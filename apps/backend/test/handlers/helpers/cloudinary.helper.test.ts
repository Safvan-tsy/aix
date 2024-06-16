import { describe, it, beforeEach, afterEach } from "vitest";
import { CloudinaryUploadResponse } from "../../../src/types/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { uploadPdfToCloudinary } from "../../../src/handlers/helpers/cloudinary.helper";
import { mockCloudinaryResponse } from "../mockData";

beforeEach(() => {
  vi.mock("cloudinary", () => ({
    v2: {
      uploader: {
        upload_stream: vi.fn(),
      },
    },
  }));
});
afterEach(() => {
  vi.resetAllMocks();
});
describe("uploadPdfToCloudinary", () => {
  it("should upload a PDF to Cloudinary and return the response", async () => {
    const mockPDFBuffer = Buffer.from("PDF content");
    const mockUploadStream = (
      options: any,
      callback: (error: any, result: any) => void
    ) => {
      return {
        end: (buffer: Buffer) => {
          callback(null, mockCloudinaryResponse);
        },
      };
    };

    (cloudinary.uploader.upload_stream as any).mockImplementation(
      mockUploadStream
    );

    const response = await uploadPdfToCloudinary(mockPDFBuffer);

    expect(response).toEqual(mockCloudinaryResponse);
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      { folder: "resumes" },
      expect.any(Function)
    );
  });
  it("should reject if there is an error during upload", async () => {
    const buffer = Buffer.from("fake pdf content");
    const mockError = new Error("Upload failed");

    const mockUploadStream = (
      options: any,
      callback: (error: any, result: any) => void
    ) => {
      return {
        end: (buffer: Buffer) => {
          callback(mockError, null);
        },
      };
    };

    (cloudinary.uploader.upload_stream as any).mockImplementation(
      mockUploadStream
    );

    await expect(uploadPdfToCloudinary(buffer)).rejects.toThrow(
      "Upload failed"
    );
  });
});
