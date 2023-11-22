import { Prisma, Transaction } from "@prisma/client";

export interface FetchFilteredTransactionsData {
  accountId: string;
  page: number;
  perPage: number;
  description?: string;
  type?: "credit" | "debit";
}
export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  fetchFilteredTransactions(
    data: FetchFilteredTransactionsData
  ): Promise<{ transactions: Transaction[]; totalTransactions: number }>;
}
