import { Prisma } from "@prisma/client";
import { AccountsRepository, FetchByUserIdData } from "../accounts-repository";
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

  async fetchByUserId(data: FetchByUserIdData) {
    const skip = (data.page - 1) * data.perPage;
    const accountsInfos = await prisma.$transaction([
      prisma.account.findMany({
        skip,
        take: data.perPage,
        where: {
          userId: data.userId,
        },
      }),
      prisma.account.count({
        where: {
          userId: data.userId,
        },
      }),
    ]);

    const accounts = accountsInfos[0];
    const totalAccounts = accountsInfos[1];

    return { accounts, totalAccounts };
  }
}
