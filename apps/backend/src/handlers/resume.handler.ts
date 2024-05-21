import { NextFunction, Request, Response } from "express";
import puppeteer from "puppeteer";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResponse } from "../types/cloudinary";
import { UserDataType } from "../types/user";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    const parsedData = getParsedData(data);
    const refactoredData = getRefactoredData(parsedData);
    const pdf = await getUploadedUrl(refactoredData);

    res.status(200).json({ resume_url: pdf, data: refactoredData });
  }
);

const getRefactoredData = (data) => {
  if (!Array.isArray(data.education) && typeof data.education === "object")
    data.education = [data.education];
  if (!Array.isArray(data.experience) && typeof data.experience === "object")
    data.experience = [data.experience];
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
    margin: { top: "50px", right: "40px", bottom: "50px", left: "40px" },
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

const getHTMLTemplate = (data: UserDataType) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Resume</title>
      <style type="text/css">
          * {
              margin: 0;
              padding: 0;
              text-indent: 0;
          }
  
          h1 {
              color: black;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: bold;
              text-decoration: none;
              font-size: 34pt;
          }
  
          .s1 {
              color: black;
              font-family: "Lucida Sans", sans-serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 9pt;
          }
  
          .s2 {
              color: black;
              font-family: "Arial Black", sans-serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 9pt;
          }
  
          a {
              color: black;
              font-family: "Arial Black", sans-serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 9pt;
          }
  
          .s3 {
              color: #2078C7;
              font-family: "Arial Black", sans-serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 9pt;
          }
  
          h2 {
              color: black;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: bold;
              text-decoration: none;
              font-size: 11pt;
          }
  
          .s4 {
              color: black;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 11pt;
          }
  
          .s6 {
              color: #666;
              font-family: "Lucida Sans", sans-serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 8pt;
          }
  
          .p,
          p {
              color: #666;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 9pt;
              margin: 0pt;
          }
  
          h3 {
              color: #666;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: bold;
              text-decoration: none;
              font-size: 9pt;
          }
        .head{
        display:flex;
        justify-content:space-between;
        }
      </style>
  </head>
  
  <body>
    <div class='head'>
      <div>
     <h1 style="padding-top: 5pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${data.fullName}</h1>
        <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${data.title}</p>
      </div>
    <div style="padding-top: 5pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
      <p class="s1" style="padding-top: 5pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
      <p class="s1" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">123 Your Street</p>
      <p class="s1" style="padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Your City, ST 12345</p>
      <p class="s2" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">(123) 456-7890</p>
      <p style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><a href="mailto:no_reply@example.com">no_reply@example.com</a></p>
    </div></div>
     
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">ABOUT</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 125%;text-align: left;">${data.about}</p>
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">EXPERIENCE</p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Company, <span class="s4">Location — </span><i>Job Title</i></h2>
      <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">MONTH 20XX - PRESENT</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 125%;text-align: left;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
  
      <p class="s3" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">EDUCATION</p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">School Name, <span class="s4">Location — </span><i>Degree</i></h2>
      <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">MONTH 20XX - MONTH 20XX</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 125%;text-align: left;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</p>
      
      <p style="text-indent: 0pt;text-align: left;"><br /></p>
  
      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">SKILLS</p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p style="padding-left: 5pt;text-indent: 0pt;line-height: 179%;text-align: left;">Lorem ipsum dolor sit amet. Consectetuer adipiscing elit.</p>
      <p style="padding-left: 5pt;text-indent: 0pt;line-height: 127%;text-align: left;">Sed diam nonummy nibh euismod tincidunt.</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 127%;text-align: left;">Laoreet dolore magna aliquam erat volutpat.</p>
      <p style="text-indent: 0pt;text-align: left;"><br /></p>
  

  </body>
  
  </html>`;
};

export { generateResume };
