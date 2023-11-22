import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { RegisterTransactionService } from "../transactions/register-transaction-service";
import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";

export function MakeRegisterTransactionService() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository();

  const registerTransactionService = new RegisterTransactionService(
    transactionsRepository,
    accountsRepository
  );

  return registerTransactionService;
}
