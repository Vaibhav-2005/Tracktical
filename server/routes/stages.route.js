import express from "express";
import { getApplicationStagesByApplicationId } from "../controllers/stages.controller.js";

const stageRoutes = express.Router();

stageRoutes.route("/getApplicationStagesById").get(getApplicationStagesByApplicationId);

export default stageRoutes;
