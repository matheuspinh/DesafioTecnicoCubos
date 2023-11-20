import { Prisma } from "@prisma/client";
import { AccountsRepository } from "../accounts-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAccountsRepository implements AccountsRepository {
  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = await prisma.account.create({ data });

    return account;
  }

  async findByAccount(account: string) {
    const accountFound = await prisma.account.findUnique({
      where: { account },
    });

    return accountFound || null;
  }
}
