import { sql } from "../configs/db.js";

async function insertNewApplicationDetails(applicationDetails, uid) {
    const { company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link } = applicationDetails;
    const response = await sql`INSERT INTO applications (uid, company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link) VALUES (${uid}, ${company_name}, ${current_round}, ${rounds_cleared}, ${related_topics}, ${current_round_type}, ${scheduled_date}, ${scheduled_time}, ${ctc_offered}, ${current_status}, ${application_link}, ${resume_link}) RETURNING *;`;
    return response;
}

async function getAllApplicationsForUserId(user){
    const response = await sql`SELECT * FROM applications WHERE uid = ${user};`;
    return response;
}

async function getApplicationById(user){
    return {message: "Not Completed yet as it needs to show application stages too."};
}

export { insertNewApplicationDetails, getAllApplicationsForUserId, getApplicationById };