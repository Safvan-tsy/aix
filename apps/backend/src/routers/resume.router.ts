import express from "express";
import { generateResume } from "../handlers/resume.handler";

const router = express.Router();

router.route("/").get(generateResume);

// router.route("").get();

export default router;
