import express from "express";
import { generateData, generateResume } from "../handlers/resume.handler";

const router = express.Router();

router.route("/").post(generateResume);
router.route("/data").post(generateData);

// router.route("").get();

export default router;
