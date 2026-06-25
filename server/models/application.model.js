import { sql } from "../configs/db.js";

async function insertNewApplicationDetails(applicationDetails, uid) {
    const { company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link } = applicationDetails;
    const response = await sql`INSERT INTO applications (uid, company_name, current_round, rounds_cleared, related_topics, current_round_type, scheduled_date, scheduled_time, ctc_offered, current_status, application_link, resume_link) VALUES (${uid}, ${company_name}, ${current_round}, ${rounds_cleared}, ${related_topics}, ${current_round_type}, ${scheduled_date}, ${scheduled_time}, ${ctc_offered}, ${current_status}, ${application_link}, ${resume_link}) RETURNING *;`;
    return response;
}

export { insertNewApplicationDetails };