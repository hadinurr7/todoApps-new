import { Request, NextFunction } from "express";
import {
  createTodoService,
  createTodoWithAssigneeService,
  editTodoService,
  updateStatusTodoService,
} from "../services/todo/todo.services";
import { TodoResponse } from "../types/ApiResponse";
import { TypedResponse } from "../types/typed.response";

export const createTodoController = async (
  req: Request,
  res: TypedResponse<TodoResponse>,
  next: NextFunction
) => {
  try {
    const creatorId = Number(res.locals.user.id);
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({
        status: 0,
        message: "Title is required",
        data: {},
      });
      return;
    }

    const todo = await createTodoService({
      creatorId,
      title,
      description,
    });

    res.status(201).json({
      status: 1,
      message: "Todo created",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: "Failed to create todo",
      data: {},
    });
  }
};

export const editTodoController = async (
  req: Request,
  res: TypedResponse<TodoResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      res.status(400).json({
        status: 0,
        message: "Title or description is required",
        data: {},
      });
      return;
    }

    const todo = await editTodoService(Number(id), title, description);

    res.status(200).json({
      status: 1,
      message: "Todo updated",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: "Failed to edit todo",
      data: {},
    });
    next(error);
  }
};

export const updateStatusController = async (
  req: Request,
  res: TypedResponse<TodoResponse>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        status: 0,
        message: "Status is required",
        data: {},
      });
      return;
    }

    const todo = await updateStatusTodoService({ id: Number(id), status });

    res.status(200).json({
      status: 1,
      message: "Status updated",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: "Failed to update status",
      data: {},
    });
    next(error);
  }
};

export const assignTodoController = async (
  req: Request,
  res: TypedResponse<TodoResponse>,
  next: NextFunction
) => {
  try {
    const { title, description, assigneeId } = req.body;
    const creatorId = Number(res.locals.user.id);

    if (!title) {
      res.status(400).json({
        status: 0,
        message: "Tittle required",
        data: {},
      });
      return;
    }

    if (!assigneeId) {
      res.status(400).json({
        status: 0,
        message: "Assignee is required",
        data: {},
      });
      return;
    }

    const todo = await createTodoWithAssigneeService({
      title,
      description,
      creatorId,
      assigneeId,
    });

    res.status(201).json({
      status: 1,
      message: "Todo assigned",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: "Failed to assign todo",
      data: {},
    });
    next(error);
  }
};
