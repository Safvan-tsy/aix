import { getHTMLTemplate } from "./resume.helper";
import puppeteer from "puppeteer";

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

export { pdfGenerator };
