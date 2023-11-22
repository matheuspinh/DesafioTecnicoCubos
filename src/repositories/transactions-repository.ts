import { Prisma, Transaction } from "@prisma/client";

export interface FetchFilteredTransactionsData {
  accountId: string;
  page: number;
  perPage: number;
  description?: string;
  type?: "credit" | "debit";
}

export interface UpdateTransactionData {
  id: string;
  description?: string;
  type?: "credit" | "debit";
  value?: number;
  accountId?: string;
}

export interface TransactionsRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
  fetchFilteredTransactions(
    data: FetchFilteredTransactionsData
  ): Promise<{ transactions: Transaction[]; totalTransactions: number }>;
  findTransactionById(id: string): Promise<Transaction | null>;
  updateTransaction(data: UpdateTransactionData): Promise<Transaction>;
}
