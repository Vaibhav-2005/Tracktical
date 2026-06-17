import {neon} from "@neondatabase/serverless";

if(!process.env.DATABASE_URL) throw new Error("ENV not Loaded Properly");
const sql = neon(process.env.DATABASE_URL);

export {sql};