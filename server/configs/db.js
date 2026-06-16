import {neon} from "@neondatabase/serverless";

const { DBHOST, DATABASE, DBUSER, DBPASSWORD } = process.env;
if (!DBHOST || !DATABASE || !DBUSER || !DBPASSWORD) {
  throw console.error("Env not properly loaded");
  
}
const sql = neon(
  `postgresql://${DBUSER}:${DBPASSWORD}@${DBHOST}/${DATABASE}?sslmode=require&channel_binding`
);

export {sql};