import { pool } from "../../config";

export const createTodo = async (
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


export const editTodo = async (
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

export const updateStatusTodo = async (id: number, status: string) => {
  const result = await pool.query(
    `UPDATE "todoApps"."todos" SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const createTodoWithAssignee = async (
  title: string,
  description: string,
  creatorId: number,
  assigneeId: number
) => {
  const result = await pool.query(
    `INSERT INTO "todoApps".todos (title, description, status, creator_id, assignee_id)
     VALUES ($1, $2, 'todo', $3, $4) RETURNING *`,
    [title, description, creatorId, assigneeId]
  );

  return result.rows[0];
};


