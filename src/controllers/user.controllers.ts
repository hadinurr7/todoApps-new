import { Request } from "express";
import { loginUser, registerUser } from "../services/user/user.services";
import { LoginResponse, RegisterResponse } from "../types/ApiResponse";
import { RegisterPayload, LoginPayload } from "../types/user.types";
import { TypedResponse } from "../types/typed.response";

export const registerController = async (
  req: Request,
  res: TypedResponse<RegisterResponse>
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        status: 0,
        message: "Username, email, and password are required",
        data: {},
      });
      return;
    }

    const payload: RegisterPayload = { username, email, password };
    await registerUser(payload);

    res.status(201).json({
      status: 1,
      message: "Register success",
      data: {},
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      status: 0,
      message: err.message || "Register failed",
      data: {},
    });
  }
};

export const loginController = async (
  req: Request,
  res: TypedResponse<LoginResponse>
) => {
  try {
    const { email, username, password } = req.body;

    if (!password || (!email && !username)) {
      throw new Error("Username or email and password are required");
    }
    const payload: LoginPayload = { email, username, password };

    const result = await loginUser(payload);

    res.status(200).json({
      status: 1,
      message: "Login success",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(401).json({
      status: 0,
      message: err.message || "Login failed",
      data: {
        username: "",
        email: "",
        token: "",
      },
    });
  }
};
