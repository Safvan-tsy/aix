import express from "express";
import { resumePipeline } from "../handlers/pipeline.handler";

const router = express.Router();

router.route("/").post(resumePipeline);

export default router;
