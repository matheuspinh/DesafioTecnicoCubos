import { registerAccount } from "./register-account";
import { verifyJwt } from "@/http/middlewares/jwt-verify";
import { verifyRequest } from "@/http/middlewares/verify-request";
import { registerAccountBodySchema } from "@/schemas/accounts";
import express from "express";

const accountsRoutes = express();

accountsRoutes.use(verifyJwt);

accountsRoutes.post(
  "/accounts",
  verifyRequest(registerAccountBodySchema),
  registerAccount
);

export default accountsRoutes;
