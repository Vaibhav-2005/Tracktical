import {
  insertNewApplicationDetails,
  getAllApplicationsOnUserId,
  getApplicationById,
} from "../models/application.model.js";

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
  const uid = res.user.uid;
  try {
    const applications = await getAllApplicationsOnUserId(uid);
    if (applications.length === 0) return res.status(404).send("No applications found for this user");
    return res.status(200).send({
      message: "Applications Fetched Successfully",
      applications: applications,
      success: true
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");    
  }
}

const updateApplicationDetailsById = async (req, res) => {
  const applicationDetails = req.body;
  const uid = res.user.uid;
};

const clearCurrentStage = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const deleteApplicationDetails = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const getApplicationStagesByApplicationId = async (req, res) => {
  return res.status(500).send("Not Created yet");
};

const getApplicationByApplicationId = async (req, res) => {
  const { application_id } = req.body;
  if (!application_id) return res.status(404).send("Application Id Not Found");
  const uid = res.user.uid;
  try {
    const [application] = await getApplicationById(uid, application_id);
    if (!application) return res.status(404).send("Application Not Found!");
    return res.status(200).send({
      message: "Application Fetched as per ID",
      application: application,
      success: true
    });
  }
  catch (err) {
    console.log(err);
    return res.status(200).send("Internal Server Error!");
  }
};

export {
  createNewApplication,
  getAllApplicationsForSpecificUser,
  getApplicationByApplicationId,
  deleteApplicationDetails,
  clearCurrentStage,
  updateApplicationDetailsById,
  getApplicationStagesByApplicationId,
};