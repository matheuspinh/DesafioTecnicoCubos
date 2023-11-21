import express from "express";
import { registerUser } from "./register-user";
import { authenticateUser } from "./authenticate-user";
import { verifyRequest } from "@/http/middlewares/verify-request";
import {
  authenticateUserBodySchema,
  registerUserBodySchema,
} from "@/schemas/users";

const usersRoutes = express.Router();

usersRoutes.post(
  "/people",
  verifyRequest(registerUserBodySchema),
  registerUser
);
usersRoutes.post(
  "/login",
  verifyRequest(authenticateUserBodySchema),
  authenticateUser
);

export default usersRoutes;
