import { pool } from "../config";

export const insertTodoModels = async (
  creatorId: number,
  title: string,
  description: string
) => {
  const result = await pool.query(
    `INSERT INTO "todoApps"."todos" (creator_id, title, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [creatorId, title, description]
  );
  return result.rows[0];
};


export const editTodoModels = async (
  id: number,
  title: string,
  description: string
) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET title = $1, description = $2 WHERE id = $3 RETURNING *`,
    [title, description, id]
  );
  return result.rows[0];
};

export const updateStatusTodoModels = async (id: number, status: string) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const assignTodoModels = async (
  title: string,
  description: string,
  creatorId: number,
  assigneeEmail: string
) => {
  const user = await pool.query(
    `SELECT id FROM "todoApps".users WHERE email = $1`,
    [assigneeEmail]
  );

  if (user.rowCount === 0) {
    throw new Error("Assignee email not found");
  }

  const assigneeId = user.rows[0].id;

  const result = await pool.query(
    `INSERT INTO "todoApps".todos (title, description, status, creator_id, assignee_id)
     VALUES ($1, $2, 'todo', $3, $4) RETURNING *`,
    [title, description, creatorId, assigneeId]
  );

  return result.rows[0];
};

