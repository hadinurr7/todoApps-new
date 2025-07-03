import { Request, Response, NextFunction } from "express";
import {
  assignTodoService,
  createTodoService,
  editTodoService,
  updateStatusTodoService,
} from "../services/todo.services";

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
    res.status(201).send({ message: "todo created", todo });
  } catch (error) {
    next(error);
  }
};

export const editTodoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await editTodoService(Number(id), title, description);
  res.json(todo);
};

export const updateStatusController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await updateStatusTodoService(Number(id), status);
  res.json(todo);
};

export const assignTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, assignee_email } = req.body;
    const creatorId = res.locals.user.id;

    if (!assignee_email) {
      res.status(400).json({ message: "email required to assign" });
      return;
    }

    const todo = await assignTodoService(
      title,
      description,
      creatorId,
      assignee_email
    );

    res.status(201).json({ message: "Todo assigned", todo });
  } catch (error) {
    next(error);
  }
};
