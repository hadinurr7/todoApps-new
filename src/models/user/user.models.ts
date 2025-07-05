import { pool } from "../../config";

export async function findUserByEmailOrUsername(email: string, username: string) {
  const result = await pool.query(
    `SELECT * FROM "todoApps"."users" WHERE email = $1 OR username = $2 LIMIT 1`,
    [email, username]
  );
  return result.rows[0];
}


export const createUser = async (username: string, email: string, hashedPassword: string) => {
  const result = await pool.query(
    'INSERT INTO "todoApps"."users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return result.rows[0];
};
