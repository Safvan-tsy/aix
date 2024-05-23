import dotenv from "dotenv";
import app from "./src/app";
import { v2 as cloudinary } from "cloudinary";
import InstillClient from "instill-sdk";

dotenv.config({ path: "./.env" });
const port: number = Number(process.env.PORT) || 3001;

cloudinary.config({
  cloud_name: "safvan",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const instill = new InstillClient(
  "https://api.instill.tech",
  "v1alpha",
  process.env.Instill_Token
);
process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log(`backend ready at ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
