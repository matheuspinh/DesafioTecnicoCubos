import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createTransaction(data: {
  accountId: string;
  value: number;
  description: string;
}) {
  const transaction = await prisma.transaction.create({
    data: {
      accountId: data.accountId,
      value: data.value,
      description: data.description,
      type: data.value > 0 ? "credit" : "debit",
    },
  });

  return transaction;
}
