import { sql } from "../configs/db.js";

async function approveUserAccountStatus(userID) {
  const response =
    await sql`UPDATE users SET account_status = TRUE where uid = ${userID};`;
  return response;
}

export { approveUserAccountStatus };