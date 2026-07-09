import express, { application } from "express";
import {
  createNewApplication,
  getAllApplicationsForSpecificUser,
  getApplicationByApplicationId,
  deleteApplicationDetails,
  clearCurrentStage,
  updateApplicationDetailsById,
} from "../controllers/application.controller.js";

const applicationRoutes = express.Router();

applicationRoutes.route('/newApplication').post(createNewApplication);
applicationRoutes.route('/getAllApplications').get(getAllApplicationsForSpecificUser);
applicationRoutes.route('/getApplicationWithApplicationId').get(getApplicationByApplicationId);
applicationRoutes.route('/updateApplicationDetails').post(updateApplicationDetailsById);
applicationRoutes.route('/deleteApplication').post(deleteApplicationDetails);
applicationRoutes.route('/clearedCurrentStage').post(clearCurrentStage);

export default applicationRoutes;