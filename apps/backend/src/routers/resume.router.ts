import express from "express";
import { generateResume } from "../handlers/resume.handler";

const router = express.Router();

router.route("/").post(generateResume);


// router.route("").get();

export default router;
