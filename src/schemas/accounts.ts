import { z } from "zod";

export const registerAccountBodySchema = z.object({
  branch: z
    .string({ required_error: "Branch is required" })
    .length(3, { message: "Branch must have 3 characters" }),
  account: z.string({ required_error: "Account is required" }),
});

export const registerCardBodySchema = z.object({
  type: z.enum(["virtual", "physical"], {
    required_error: "Invalid card type",
  }),
  number: z.string({ required_error: "Card number is required" }),
  cvv: z
    .string({ required_error: "CVV is required" })
    .length(3, { message: "CVV must have 3 characters" }),
});
