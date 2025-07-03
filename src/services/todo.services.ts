import { assignTodoModels, editTodoModels, insertTodoModels, updateStatusTodoModels } from "../models/todo.models";


export const createTodoService = async (userId: number, title: string, description: string) => {
  return await insertTodoModels(userId, title, description);
};


export const editTodoService = async (id: number, title: string, description: string) => {
  return await editTodoModels(id, title, description);
};

export const updateStatusTodoService = async (id: number, status: string) => {
  return await updateStatusTodoModels(id, status);
};

export const assignTodoService = async (
  title: string,
  description: string,
  creatorId: number,
  assigneeEmail: string
) => {
  return await assignTodoModels(title, description, creatorId, assigneeEmail);
};


