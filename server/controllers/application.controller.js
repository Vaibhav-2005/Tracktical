import { insertNewApplicationDetails } from "../models/application.model.js";

const createNewApplication = async (req, res) => {
    const applicationDetails = req.body;
    const uid = res.user.uid;
    if (!applicationDetails || !uid) return res.status(404).send("Application Details Not Found!");
    if (!applicationDetails.company_name ||
        !applicationDetails.current_round ||
        !applicationDetails.current_round_type,
        !applicationDetails.current_status)
        return res.status(404).send("Mandatory Application Details are missing");
    try {
        const response = await insertNewApplicationDetails(applicationDetails, uid);
        if (response) {
            return res.status(200).send('Application Inserted Successfully');
        }
        else return res.status(401).send('Could Not Insert Application');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

const getAllApplicationsForSpecificUser = async (req, res) => {
    return res.status(500).send("Not Created yet");
}

const updateApplicationDetailsById = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const clearCurrentStage = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const deleteApplicationDetails = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const getApplicationByApplicationId = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

export {
  createNewApplication,
  getAllApplicationsForSpecificUser,
  getApplicationByApplicationId,
  deleteApplicationDetails,
  clearCurrentStage,
  updateApplicationDetailsById,
};