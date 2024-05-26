import express from "express";
import {
  booleanSearchPipeline,
  resumePipeline,
} from "../handlers/pipeline.handler";

const router = express.Router();

router.route("/resume").post(resumePipeline);
router.route("/boolean").post(booleanSearchPipeline);

export default router;
