import { CloudinaryUploadResponse } from "../../types/cloudinary";
import { v2 as cloudinary } from "cloudinary";

const uploadPdfToCloudinary = (
    buffer: Buffer
  ): Promise<CloudinaryUploadResponse> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "resumes" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryUploadResponse);
        }
      );
      stream.end(buffer);
    });
  };
  
  export {uploadPdfToCloudinary}