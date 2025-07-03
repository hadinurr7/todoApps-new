import { insertTodo } from "../models/todo.models";


export const createTodoService = async (userId: number, title: string, description: string) => {
  return await insertTodo(userId, title, description);
};