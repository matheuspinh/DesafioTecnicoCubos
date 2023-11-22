import { GetAccountBalanceService } from "../accounts/get-account-balance-service";
import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";

export function MakeGetAccountBalanceService() {
  const accountsRepository = new PrismaAccountsRepository();
  const getAccountBalanceService = new GetAccountBalanceService(
    accountsRepository
  );

  return getAccountBalanceService;
}
