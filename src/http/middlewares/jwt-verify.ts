import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token was not provided" });
  }

  const token = authorization.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Token was not provided" });
  }

  try {
    const { id } = jwt.verify(token, env.JWT_SECRET) as { id: string };

    req.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
