import {
  createTodo,
  createTodoWithAssignee,
  editTodo,
  updateStatusTodo,
} from "../../models/Todo/todo.models";
import { CreateTodoPayload, CreateTodoWithAssigneePayload, TodoPayload, UpdateStatusPayload } from "../../types/todo.types";

export const createTodoService = async (payload: CreateTodoPayload) => {
  const { creatorId, title, description } = payload;
  return await createTodo(creatorId, title, description);
};

export const createTodoWithAssigneeService = async (payload: CreateTodoWithAssigneePayload) => {
  const { title, description, creatorId, assigneeId } = payload;
  return await createTodoWithAssignee(title, description, creatorId, assigneeId);
};

export const editTodoService = async (
  id: number,
  title: string,
  description: string
) => {
  return await editTodo(id, title, description);
};

export const updateStatusTodoService = async (payload: UpdateStatusPayload) => {
  const { id, status } = payload;
  return await updateStatusTodo(id, status);
};

