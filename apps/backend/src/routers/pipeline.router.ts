import express from "express";
import {
  booleanSearchPipeline,
  getBooleanSearchPipeline,
  getResumePipeline,
  resumePipeline,
} from "../handlers/pipeline.handler";

const router = express.Router();

router.route("/resume").post(resumePipeline).get(getResumePipeline);
router
  .route("/boolean")
  .post(booleanSearchPipeline)
  .get(getBooleanSearchPipeline);

export default router;
