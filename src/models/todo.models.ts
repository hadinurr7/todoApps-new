import { pool } from "../config";

export const insertTodo = async (userId: number, title: string, description: string) => {
  const result = await pool.query(
    'INSERT INTO "todoApps"."todos" (user_Id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  );
  return result.rows[0];
};

export const editTodo = async (id: number, title: string, description: string) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET title = $1, description = $2 WHERE id = $3 RETURNING *`,
    [title, description, id]
  );
  return result.rows[0];
};

export const updateStatus = async (id: number, status: string) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const assignTodo = async (id: number, user_id: number) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET user_id = $1 WHERE id = $2 RETURNING *`,
    [user_id, id]
  );
  return result.rows[0];
};