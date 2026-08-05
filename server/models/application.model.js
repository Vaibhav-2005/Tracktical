import { sql } from "../configs/db.js";

async function insertNewApplicationDetails(applicationDetails, uid) {
    const { company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link } = applicationDetails;
    const response = await sql`INSERT INTO applications (uid, company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link) VALUES (${uid}, ${company_name}, ${current_round}, ${rounds_cleared}, ${related_topics}, ${current_round_type}, ${scheduled_date}, ${scheduled_time}, ${ctc_offered}, ${current_status}, ${application_link}, ${resume_link}) RETURNING *;`;
    return response;
}

async function getAllApplicationsOnUserId(uid) {
    const response = await sql`SELECT * FROM applications WHERE uid = ${uid};`;
    return response;
}

async function getApplicationById(uid, application_id) {
    const response = await sql`SELECT * FROM applications WHERE application_id = ${application_id} AND uid = ${uid};`;
    return response;
}

async function updateApplicationDetails(application_details, application_id, uid) {
    //extracting keys from the object body
    const keys = Object.keys(application_details);
    // extracting values from the object body
    const values = keys.map(key => application_details[key]);
    //next 4 lines denote pushing the where clause parameters and adding its placeholder index 
    values.push(application_id);
    const applicationIdIndex = `$${values.length}`;
    values.push(uid);
    const uidIndex = `$${values.length}`;
    //array mapped to each placeholder for its values
    const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(', ');
    //creating the sql query as a string to pass with value array
    const queryText = `UPDATE applications SET ${setClause} WHERE application_id = ${applicationIdIndex} AND uid = ${uidIndex} RETURNING *;`
    const response = await sql.query(queryText, values);
    return response;
}

async function clearCurrentRound(application_id, uid) {
    return null;
}

async function hideApplication(application_id, uid){
    const response = await sql`UPDATE applications SET visibility = false WHERE application_id = ${application_id} AND uid = ${uid} RETURNING *;`;
    return response;
}

export {
  insertNewApplicationDetails,
  getAllApplicationsOnUserId,
  getApplicationById,
  updateApplicationDetails,
  clearCurrentRound,
  hideApplication
};
