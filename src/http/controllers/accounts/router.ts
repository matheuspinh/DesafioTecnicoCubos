import { registerAccount } from "./register-account";
import { verifyJwt } from "@/http/middlewares/jwt-verify";
import { verifyRequestBody } from "@/http/middlewares/verify-request-body";
import {
  fetchAccountsByUserIdQuerySchema,
  registerAccountBodySchema,
  registerCardBodySchema,
} from "@/schemas/accounts";
import express from "express";
import { fetchAccountsByUserId } from "./fetch-accounts-by-user-id";
import { verifyRequestQuery } from "@/http/middlewares/verify-request-query";
import { registerCard } from "./register-card";

const accountsRoutes = express();

accountsRoutes.use(verifyJwt);

accountsRoutes.post(
  "/accounts",
  verifyRequestBody(registerAccountBodySchema),
  registerAccount
);
accountsRoutes.post(
  "/accounts/:accountId/cards",
  verifyRequestBody(registerCardBodySchema),
  registerCard
);
accountsRoutes.get(
  "/accounts",
  verifyRequestQuery(fetchAccountsByUserIdQuerySchema),
  fetchAccountsByUserId
);

export default accountsRoutes;
