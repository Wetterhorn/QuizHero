import dns from "node:dns";
import pg from "pg";


dns.setDefaultResultOrder("ipv4first");
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});