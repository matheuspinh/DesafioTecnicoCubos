import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { RevertTransactionService } from "../transactions/revert-transaction-service";

export function MakeRevertTransactionService() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository();

  const revertTransactionService = new RevertTransactionService(
    transactionsRepository,
    accountsRepository
  );

  return revertTransactionService;
}
