import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../services/user.services";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).send({ message: "Register success" });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginUser(email, password);
    res.status(200).send({ message: "Login success", token });
  } catch (error) {
    next(error);
  }
};
