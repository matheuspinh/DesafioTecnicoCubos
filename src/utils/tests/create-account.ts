import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createAccount(data: Prisma.AccountUncheckedCreateInput) {
  const account = await prisma.account.create({
    data: {
      userId: data.userId,
      branch: data.branch,
      account: data.account,
    },
  });

  return account;
}
