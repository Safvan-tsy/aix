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

  let contactArray = [];
  if (data.contact) {
    contactArray = Object.entries(data.contact).map(([key, value]) => ({
      label: key.toLowerCase(),
      url: value,
    }));
  }
  const location = Array.isArray(data.basic_details.location)
    ? data.basic_details.location[0]
    : data.basic_details.location;

  data.education.forEach((item) => {
    if (item.education && Array.isArray(item.education)) {
      data.education = item.education;
    }
  });

  return {
    fullName: capitalizeFirstLetterOfEachWord(data.basic_details.name),
    title: capitalizeFirstLetterOfEachWord(data.basic_details.title),
    location: location,
    contact: contactArray,
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
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatSocialMediaUrl = (url) => {
    const urlObj = new URL(url);
    return `${urlObj.hostname.replace("www.", "")}/${urlObj.pathname.replace("/", "")}`;
  };
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
              font-size: 10pt;
          }
  
          .p,
          p {
              color: #666;
              font-family: "Book Antiqua", serif;
              font-style: normal;
              font-weight: normal;
              text-decoration: none;
              font-size: 10pt;
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
        <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${data.title} ${data.location ? `- <span class="s6">${data.location}</span>` : ""}</p>
      </div>
    <div style="padding-top: 5pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
    ${data.contact
      .map((item) => {
        const label = capitalizeFirstLetter(item.label);
        const url =
          item.label != "email" ? formatSocialMediaUrl(item.url) : item.url;

        if (item.label === "email") {
          return `<p style="padding-left: 5pt;text-indent: 0pt;text-align: left;">
              <a href="mailto:${item.url}">E-mail: ${item.url}</a>
          </p>`;
        } else if (item.label == "twitter" || item.label == "x.com") {
          return `<p style="padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">
              <a href="${item.url}">${label}: ${url}</a>
          </p>`;
        } else if (item.label == "github") {
          return `<p style="padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">
              <a href="${item.url}">${label}: ${url}</a>
          </p>`;
        } else if (item.label == "linkedin") {
          return `<p style="padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">
              <a href="${item.url}">LinkedIn: ${url}</a>
          </p>`;
        } else if (item.label == "personalwebsite") {
          return `<p style="padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">
              <a href="${item.url}">Website: ${url}</a>
          </p>`;
        }
      })
      .join("")}
    </div></div>
     
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>

      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">ABOUT</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">${data.about}</p>

      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>

      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">EXPERIENCE</p>
      ${data.experience
        .map(
          (item) =>
            `
        <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
        <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">${item.org ? item.org : ""} ${item.title ? `- <span class="s4">${item.title}</span>` : ""}</h2>
        <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${item.duration ? item.duration : ""}</p>
        <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">${item.description ? item.description : ""}</p>
      `
        )
        .join("")}
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
  
      <p class="s3" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">EDUCATION</p>
      ${data.education
        .map(
          (item) =>
            `
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;">${item.institution ? item.institution : ""} ${item.course_name ? `- <span class="s4">${item.course_name}</span>` : ""}</h2>
      <p class="s6" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">${item.duration ? item.duration : ""}</p>
      <p style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;line-height: 130%;text-align: left;">${item.description ? item.description : ""}</p>
      `
        )
        .join("")}
      <p style="text-indent: 0pt;text-align: left;"><br /></p>
  
      <p class="s3" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">SKILLS</p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <div style="display: flex; flex-wrap: wrap;">
      ${data.skills
        .map(
          (item) =>
            `
      <p style="padding-left: 5pt;text-indent: 0pt;line-height: 127%;text-align: left;">${item},</p>

  `
        )
        .join("")}
      </div>
      <p style="text-indent: 0pt;text-align: left;"><br /></p>

  </body>
  
  </html>`;
};

export { generateResume };
