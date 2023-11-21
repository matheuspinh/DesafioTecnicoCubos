import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const verifyRequestBody =
  (zodSchema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
