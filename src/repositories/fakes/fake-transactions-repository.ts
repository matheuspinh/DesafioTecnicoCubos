import { Prisma, Transaction } from "@prisma/client";
import { randomUUID } from "crypto";
import { TransactionsRepository } from "../transactions-repository";

export class FakeTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      value: data.value,
      type: data.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: data.accountId,
      description: data.description,
    };

    this.items.push(transaction);

    return transaction;
  }

  async fetchFilteredTransactions(data: {
    accountId: string;
    page: number;
    perPage: number;
    description?: string;
    type?: "credit" | "debit";
  }) {
    const skip = (data.page - 1) * data.perPage;
    const transactions = this.items.filter(
      (transaction) =>
        transaction.accountId === data.accountId &&
        (!data.description ||
          transaction.description?.includes(data.description)) &&
        (!data.type || transaction.type === data.type)
    );

    const totalTransactions = transactions.length;

    return {
      transactions: transactions.slice(skip, skip + data.perPage),
      totalTransactions,
    };
  }
}
