import { registerAccount } from "./register-account";
import { verifyJwt } from "@/http/middlewares/jwt-verify";
import { verifyRequestBody } from "@/http/middlewares/verify-request-body";
import {
  registerAccountBodySchema,
  registerCardBodySchema,
} from "@/schemas/accounts";
import express from "express";
import { fetchAccountsByUserId } from "./fetch-accounts-by-user-id";
import { verifyRequestQuery } from "@/http/middlewares/verify-request-query";
import { registerCard } from "./register-card";
import {
  paginationQuerySchema,
  paginationWithSearchQuerySchema,
} from "@/schemas/pagination";
import { fetchCardsByAccountId } from "./fetch-cards-by-account-id";
import { fetchCardsByUserId } from "./fetch-cards-by-user-id";
import { verify } from "crypto";
import { registerTransactionBodySchema } from "@/schemas/transactions";
import { registerTransaction } from "./register-transaction";
import { fetchFilteredTransactions } from "./fetch-transactions";

const accountsRoutes = express();

accountsRoutes.use(verifyJwt);

accountsRoutes.get(
  "/accounts/cards",
  verifyRequestQuery(paginationQuerySchema),
  fetchCardsByUserId
);
accountsRoutes.post(
  "/accounts",
  verifyRequestBody(registerAccountBodySchema),
  registerAccount
);
accountsRoutes.post(
  "/accounts/:accountId/transactions",
  verifyRequestBody(registerTransactionBodySchema),
  registerTransaction
);
accountsRoutes.post(
  "/accounts/:accountId/cards",
  verifyRequestBody(registerCardBodySchema),
  registerCard
);
accountsRoutes.get(
  "/accounts/:accountId/cards",
  verifyRequestQuery(paginationQuerySchema),
  fetchCardsByAccountId
);
accountsRoutes.get(
  "/accounts",
  verifyRequestQuery(paginationQuerySchema),
  fetchAccountsByUserId
);
accountsRoutes.get(
  "/accounts/:accountId/transactions",
  verifyRequestQuery(paginationWithSearchQuerySchema),
  fetchFilteredTransactions
);

export default accountsRoutes;
