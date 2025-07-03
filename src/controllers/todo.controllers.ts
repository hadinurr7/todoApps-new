import { Request, Response, NextFunction } from "express";
import { createTodoService } from "../services/todo.services";
import { assignTodo, editTodo, updateStatus } from "../models/todo.models";

export const createTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("buat todo");
  try {
const userId = Number(res.locals.user.id);
    console.log("ini userId", userId);

    const { title, description } = req.body;
    const todo = await createTodoService(userId, title, description);
    res.status(201).send({message:"todo created", todo});
  } catch (error) {
    next(error);
  }
};

export const editTodoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await editTodo(Number(id), title, description);
  res.json(todo);
};

export const updateStatusController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await updateStatus(Number(id), status);
  res.json(todo);
};

export const assignTodoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const todo = await assignTodo(Number(id), user_id);
  res.json(todo);
};
