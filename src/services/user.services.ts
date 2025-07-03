import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.models";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function registerUser(name: string, email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await argon2.hash(password);
  await createUser(name, email, hashedPassword);
  return { message: "Register success" };
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },JWT_SECRET, { expiresIn: "1h" }
  );

  return { message: "Login success", token };
}
