import { NextFunction, Request } from "express";
import { loginUser, registerUser } from "../services/user/user.services";
import { LoginResponse, RegisterResponse } from "../types/ApiResponse";
import { RegisterPayload, LoginPayload } from "../types/user.types";
import { TypedResponse } from "../types/typed.response";

export const registerController = async (
  req: Request,
  res: TypedResponse<RegisterResponse>,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const payload: RegisterPayload = { username, email, password };

    await registerUser(payload);

    res.status(201).json({
      status: 1,
      message: "Register success",
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      status: 0,
      message: error.message || "Register failed",
      data: {},
    });
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: TypedResponse<LoginResponse>,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body;
    const payload: LoginPayload = { email, username, password };

    const result = await loginUser(payload);

    res.status(200).json({
      status: 1,
      message: "Login success",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      status: 0,
      message: error.message || "Login failed",
      data: {
        username: "",
        token: "",
      },
    });
    next(error);
  }
};
