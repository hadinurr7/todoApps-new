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
  try {
    const creatorId = Number(res.locals.user.id);
    console.log("ini creatorId", creatorId);

    const { title, description } = req.body;
    const todo = await createTodoService(creatorId, title, description);
    res.status(201).send({ message: "todo created", todo });
  } catch (error) {
    next(error);
  }
};

export const editTodoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await editTodoService(Number(id), title, description);
  res.send(todo);
};

export const updateStatusController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const todo = await updateStatusTodoService(Number(id), status);
  res.send(todo);
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
      res.status(400).send({ message: "email required to assign" });
      return;
    }

    const todo = await assignTodoService(
      title,
      description,
      creatorId,
      assignee_email
    );

    res.status(201).send({ message: "Todo assigned", todo });
  } catch (error) {
    next(error);
  }
};
