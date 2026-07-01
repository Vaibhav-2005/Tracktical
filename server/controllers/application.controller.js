import { insertNewApplicationDetails, getAllApplicationsForUserId, getApplicationById } from "../models/application.model.js";

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
  const user = res.user.uid;
  try{
    const response = await getAllApplicationsForUserId(user);
    return res.status(200).send({
      message: "All Applications Fetched!",
      response: response,
      success: true
    });
  }
  catch(err){
    return res.status(500).send("Internal Server Error!");
  }
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
  const { application_id }= req.body;
  const uid = res.user.uid;
  if(!application_id) return res.status(404).send("Application Not Found!");
  try{
    const response = await getApplicationById(application_id, uid);
    console.log(response);
    if(!response){
      return res.status(404).send("No Response Detected");
    }
    //remember to add check if the uid matches the one we got from the uid recieved from response.
    return res.status(200).send(response);
  }
  catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  createNewApplication,
  getAllApplicationsForSpecificUser,
  getApplicationByApplicationId,
  deleteApplicationDetails,
  clearCurrentStage,
  updateApplicationDetailsById,
};