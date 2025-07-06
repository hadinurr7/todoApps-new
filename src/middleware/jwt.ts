import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("ini token",token,req.headers);

  if (!token) {
    res.status(401).json({
      message: "authorization failed, token is missing",
    });
    return;
  }

  verify(token, JWT_SECRET!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
        return
      } else {
        res.status(401).json({ message: "Invalid token" });
        return
      }
    }
    res.locals.user = payload;
    next();
  });
};

