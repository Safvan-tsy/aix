import express from "express";
import { generateResume } from "../handlers/resume.handler";
import { resumePipeline } from "../handlers/pipeline.handler";

const router = express.Router();

router.route("/").post(generateResume);

router.route("/").get(resumePipeline);

// router.route("").get();

export default router;
