import { NextFunction, Request, Response } from "express";
import puppeteer from "puppeteer";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const generateResume = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;
    // data = data[0].replace(/\\n/g, "");
    // const parsedData = JSON.parse(data);
    const parsedData = getParsedData(data);
    const refactoredData = getRefactoredData(parsedData);
    const pdf = await pdfGenerator(refactoredData);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

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
const pdfGenerator = async (data) => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();
  const htmlContent = getHTMLTemplate(data);
  // console.log('html',htmlContent)
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");
  console.log("page:", page);
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
  });
  // Close the browser instance
  await browser.close();
  return pdf;
};
const getHTMLTemplate = (data) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <title>My profile</title>
      <head>
      <style type="text/css">
          body{
              width: 1200px;
              margin: 0;
              padding: 0px;
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: rgb(33,33,33);
          }
          .report-header{
              background: rgb(178,230,212);
              color: rgb(102,102,103);
              padding: 15px;
              padding-left: 200px;
              box-sizing: border-box;
              display: block;
              position: relative;
          }
          .report-header .logo{
              position: absolute;
              top: 40px;
              left: 15px;
              width: 150px;
          }
          .report-footer{
              background: rgb(178,230,212);
              color: rgb(102,102,103);
              padding: 15px;
              box-sizing: border-box;
              display: block;
              position: relative;
          }
          .report-body{
              width: 70%;
              display: inline-block;
              position: relative;
              padding: 15px;
              box-sizing: border-box;
              vertical-align: top;
          }
          .report-photo{
              width: 28%;
              display: inline-block;
              position: relative;
              vertical-align: top;
              box-sizing: border-box;
              margin-top: 15px;
          }
          .report-body .info p{
              border: #ccc solid 1px;
              padding: 5px;
              display: block;
              position: relative;
          }
      </style>
      <meta charset="utf-8">
  </head>
  <body>
      <div class="report-header">
          <h3>${data.fullName}</h3>
          <p>{{date}}</p>
      </div>
      <div class="report-body">
          <div class="info">
              <p>Student: {{name}}</p>
              <p>Age: {{age}}</p>
              <p>Birthdate: {{birthdate}}</p>
              <p>Course: {{course}}</p>
          </div>
          <div class="obs">
              <p>Bio: {{bio}}</p>
          </div>
      </div>
      <div class="report-footer">
          Happy Puppeteering!
      </div>
  </body>
  </html>`;
};

export { generateResume };
