import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { GetAccountById } from "../accounts/get-account-by-id";

export function MakeGetAccountByIdService() {
  const accountsRepository = new PrismaAccountsRepository();
  const getAccountByIdService = new GetAccountById(accountsRepository);

  return getAccountByIdService;
}
