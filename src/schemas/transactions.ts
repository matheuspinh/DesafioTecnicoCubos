import { z } from "zod";

export const registerTransactionBodySchema = z.object({
  description: z.string({ required_error: "Description is required" }),
  value: z.number({ required_error: "Value is required" }),
});

export const revertTransactionBodySchema = z.object({
  description: z.string({ required_error: "Description is required" }),
});
