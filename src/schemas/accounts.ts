import { z } from "zod";

export const registerAccountBodySchema = z.object({
  branch: z
    .string({ required_error: "Branch is required" })
    .length(3, { message: "Branch must have 3 characters" }),
  account: z.string({ required_error: "Account is required" }),
});
