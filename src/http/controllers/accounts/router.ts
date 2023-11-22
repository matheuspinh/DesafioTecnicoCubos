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
import {
  registerTransactionBodySchema,
  revertTransactionBodySchema,
} from "@/schemas/transactions";
import { registerTransaction } from "./register-transaction";
import { fetchFilteredTransactions } from "./fetch-transactions";
import { getAccountBalance } from "./get-account-balance";
import { revertTransaction } from "./revert-transaction";

const accountsRoutes = express();

accountsRoutes.get(
  "/accounts/cards",
  [verifyRequestQuery(paginationQuerySchema), verifyJwt],
  fetchCardsByUserId
);
accountsRoutes.post(
  "/accounts",
  [verifyRequestBody(registerAccountBodySchema), verifyJwt],
  registerAccount
);
accountsRoutes.post(
  "/accounts/:accountId/transactions",
  [verifyRequestBody(registerTransactionBodySchema), verifyJwt],
  registerTransaction
);
accountsRoutes.post(
  "/accounts/:accountId/cards",
  [verifyRequestBody(registerCardBodySchema), verifyJwt],
  registerCard
);
accountsRoutes.get(
  "/accounts/:accountId/cards",
  [verifyRequestQuery(paginationQuerySchema), verifyJwt],
  fetchCardsByAccountId
);
accountsRoutes.get(
  "/accounts",
  [verifyRequestQuery(paginationQuerySchema), verifyJwt],
  fetchAccountsByUserId
);
accountsRoutes.get(
  "/accounts/:accountId/transactions",
  [verifyRequestQuery(paginationWithSearchQuerySchema), verifyJwt],
  fetchFilteredTransactions
);
accountsRoutes.get(
  "/accounts/:accountId/balance",
  verifyJwt,
  getAccountBalance
);
accountsRoutes.post(
  "/accounts/:accountId/transactions/:transactionId/revert",
  [verifyJwt, verifyRequestBody(revertTransactionBodySchema)],
  revertTransaction
);

export default accountsRoutes;
