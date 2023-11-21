import express from "express";
import { registerUser } from "./register-user";
import { authenticateUser } from "./authenticate-user";
import { verifyRequestBody } from "@/http/middlewares/verify-request-body";
import {
  authenticateUserBodySchema,
  registerUserBodySchema,
} from "@/schemas/users";

const usersRoutes = express.Router();

usersRoutes.post(
  "/people",
  verifyRequestBody(registerUserBodySchema),
  registerUser
);
usersRoutes.post(
  "/login",
  verifyRequestBody(authenticateUserBodySchema),
  authenticateUser
);

export default usersRoutes;
