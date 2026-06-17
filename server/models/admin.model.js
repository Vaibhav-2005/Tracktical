import { sql } from "../configs/db.js";

async function approveUserAccountStatus(userID) {
  const response =
    await sql`UPDATE users SET account_status = TRUE where uid = ${userID} RETURNING uid, email_id, account_status;`;
  return response;
}

export { approveUserAccountStatus };