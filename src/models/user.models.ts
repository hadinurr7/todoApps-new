import { pool } from "../config";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM "todoApps"."users" WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (name: string, email: string, hashedPassword: string) => {
  const result = await pool.query(
    'INSERT INTO "todoApps"."users" (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};
