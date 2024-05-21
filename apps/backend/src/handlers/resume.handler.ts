import { NextFunction, Request, Response } from "express";
import puppeteer from "puppeteer";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResponse } from "../types/cloudinary";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    // data = data[0].replace(/\\n/g, "");
    // const parsedData = JSON.parse(data);
    const parsedData = getParsedData(data);
    const refactoredData = getRefactoredData(parsedData);
    const pdf = await getUploadedUrl(refactoredData);

    res.status(200).send(pdf);
  }
);

const getRefactoredData = (data) => {
  return {
    fullName: capitalizeFirstLetterOfEachWord(data.basic_details.name),
    title: capitalizeFirstLetterOfEachWord(data.basic_details.title),
    location: data.basic_details.location,
    contact: data.contact,
    about: data.about.about,
    skills: data.about.skills,
    education: data.education,
    experience: data.experience,
  };
};

function capitalizeFirstLetterOfEachWord(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const getParsedData = (data) => {
  return JSON.parse(data[0].replace(/\\n/g, ""));
};

const pdfGenerator = async (data): Promise<Buffer> => {
  // Create a browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = getHTMLTemplate(data);
  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
  });
  // Close the browser instance
  await browser.close();
  return pdf;
};

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

const getUploadedUrl = async (data: any) => {
  const pdfBuffer = await pdfGenerator(data);
  const result = await uploadPdfToCloudinary(pdfBuffer);
  return result.secure_url;
};

const getHTMLTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Resume</title>
      <style>
          body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          .header, .footer {
              background-color: #b2e6d4;
              color: #666667;
              padding: 15px;
          }
          .header h3, .footer {
              margin: 0;
          }
          .content {
              padding: 15px;
          }
          .content .section {
              margin-bottom: 20px;
          }
          .content .section h4 {
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h3>${data.fullName}</h3>
          <p>${data.title}</p>
          <p>${data.location}</p>
      </div>
      <div class="content">
          <div class="section">
              <h4>Contact</h4>
              <p>${data.contact}</p>
          </div>
          <div class="section">
              <h4>About</h4>
              <p>${data.about}</p>
          </div>
          <div class="section">
              <h4>Skills</h4>
              <p>${data.skills.join(", ")}</p>
          </div>
          <div class="section">
              <h4>Education</h4>
              test1
          </div>
          <div class="section">
              <h4>Experience</h4>
              test</p>
          </div>
      </div>
      <div class="footer">
          <p>test</p>
      </div>
  </body>
  </html>
  `;
};

export { generateResume };
