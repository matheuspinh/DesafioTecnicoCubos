import { z } from "zod";

export const paginationQuerySchema = z.object({
  currentPage: z
    .string({ required_error: "Page is required" })
    .regex(/^[0-9]+$/, { message: "Page must be a number" }),
  itemsPerPage: z
    .string({ required_error: "PerPage is required" })
    .regex(/^[0-9]+$/, { message: "PerPage must be a number" }),
});

export const paginationWithSearchQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
  type: z.string().optional(),
});
