import bcrypt from "bcrypt";
import { sql } from "../configs/db.js";

async function findUserDetails(userEmailID, userMobileNumber) {
  const userDetails =
      await sql`SELECT uid, email_id, mobile_number, password, account_status FROM users WHERE email_id = ${userEmailID} OR mobile_number = ${userMobileNumber};`;
  return userDetails;
}

async function addNewUser(user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    const userDetails = await sql`INSERT INTO users (name, occupation, email_id, password, mobile_number) VALUES (${user.name}, ${user.occupation}, ${user.email_id}, ${hash}, ${user.mobile_number});`;
    return userDetails;
}

export { findUserDetails, addNewUser};