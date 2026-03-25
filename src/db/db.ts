import 'server-only';
import { Pool } from 'pg';


declare global {
  var pgPool: InstanceType<typeof Pool> | undefined;
};


export const pool = global.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
});
