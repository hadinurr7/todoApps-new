import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { LoginPayload, RegisterPayload } from "../../types/user.types";
import {
  createUser,
  findUserByEmailOrUsername,
} from "../../models/user/user.models";

const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(payload: RegisterPayload) {
  const { username, email, password } = payload;

  const user = await findUserByEmailOrUsername(email, username);

  const existing = user?.email || user?.username;
  if (existing) throw new Error("User already registered");

  const hashedPassword = await argon2.hash(password);
  await createUser(username, email, hashedPassword);

  return { message: "Register success" };
}

export async function loginUser(payload: LoginPayload) {
  const { email, username, password } = payload;

  const user = await findUserByEmailOrUsername(email, username);
  if (!user) throw new Error("User not found");

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { username: user.username, email, token };
}
