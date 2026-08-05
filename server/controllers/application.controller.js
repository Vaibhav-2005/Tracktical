import {
  insertNewApplicationDetails,
  getAllApplicationsOnUserId,
  getApplicationById,
  updateApplicationDetails,
  clearCurrentRound,
  hideApplication
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
    if (applications.length === 0) return res.status(404).send({ message: "No applications found for this user" });
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
  const allApplicationDetails = req.body;
  const uid = res.user.uid;
  if (!allApplicationDetails) return res.status(404).send("Application Details Not Found!");
  // comparing with 1 as appliction_id will come till this point else it would have been caught in the above line
  if (Object.keys(allApplicationDetails).length === 1) return res.status(404).send("No Data Found to update");
  const { application_id, ...applicationDetails } = allApplicationDetails;
  try {
    const updatedDetails = await updateApplicationDetails(applicationDetails, application_id, uid);
    if (updatedDetails.length === 0) return res.status(401).send("Could Not Update Details for Given Application");
    return res.status(200).send("Application Updated Successfully");
  }
  catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error!");
  }
};

const clearCurrentStage = async (req, res) => {
  return res.status(500).send("Not Created Yet");
};

const hideApplicationDetails = async (req, res) => {
  if(!req.body) return res.status(422).send("Application Details Not Found!");
  const applicationId = req.body.application_id;
  const uid = res.user.uid;
  console.log(applicationId);
  if(!applicationId) return res.status(404).send("Application Id Not Found!");
  try{
    const response = await hideApplication(applicationId, uid);
    if(response.length === 0) return res.status(404).send("Application Not Found");
    return res.status(200).send({
      message: "Application has been hidden from sight.",
      success: true
    })
  }
  catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const getApplicationByApplicationId = async (req, res) => {
  const { application_id } = req.body;
  if (!application_id) return res.status(404).send("Application Id Not Found!");
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
    return res.status(500).send("Internal Server Error!");
  }
};

export {
  createNewApplication,
  getAllApplicationsForSpecificUser,
  getApplicationByApplicationId,
  hideApplicationDetails,
  clearCurrentStage,
  updateApplicationDetailsById,
};