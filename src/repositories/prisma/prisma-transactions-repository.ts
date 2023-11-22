import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  FetchFilteredTransactionsData,
  TransactionsRepository,
  UpdateTransactionData,
} from "../transactions-repository";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({ data });

    return transaction;
  }

  async fetchFilteredTransactions(data: FetchFilteredTransactionsData) {
    const skip = (data.page - 1) * data.perPage;
    const transactionsInfos = await prisma.$transaction([
      prisma.transaction.findMany({
        skip,
        take: data.perPage,
        where: {
          accountId: data.accountId,
          description: {
            contains: data.description,
          },
          type: data.type,
        },
      }),
      prisma.transaction.count({
        where: {
          accountId: data.accountId,
          description: {
            contains: data.description,
          },
          type: data.type,
        },
      }),
    ]);

    const transactions = transactionsInfos[0];
    const totalTransactions = transactionsInfos[1];

    return { transactions, totalTransactions };
  }

  async updateTransaction(data: UpdateTransactionData) {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    });

    return transaction;
  }

  async findTransactionById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }
}
