import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { FetchAccountsByUserIdService } from "../accounts/fetch-accounts-by-user-id-service";

export function MakeFetchAccountsByUserIdService() {
  const accountsRepository = new PrismaAccountsRepository();
  const fetchAccountsByUserIdService = new FetchAccountsByUserIdService(
    accountsRepository
  );

  return fetchAccountsByUserIdService;
}
