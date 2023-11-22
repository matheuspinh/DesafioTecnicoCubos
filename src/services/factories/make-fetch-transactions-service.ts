import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { FetchFilteredTransactionsService } from "../transactions/fetch-filtered-transactions-service";

export function MakeFetchTransactionsService() {
  const transactionsRepository = new PrismaTransactionsRepository();
  const fetchFilteredTransactionsService = new FetchFilteredTransactionsService(
    transactionsRepository
  );

  return fetchFilteredTransactionsService;
}
