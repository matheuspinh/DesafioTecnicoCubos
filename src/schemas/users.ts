import { z } from "zod";

export const registerUserBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  document: z.string({ required_error: "Document is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must have at least 6 characters" }),
});

export const authenticateUserBodySchema = z.object({
  document: z.string({ required_error: "Document is required" }),
  password: z.string({ required_error: "Password is required" }),
});
