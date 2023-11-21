import { Prisma, $Enums } from "@prisma/client";
import { CardsRepository, FetchByAccountIdData } from "../cards-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCardsRepository implements CardsRepository {
  async create(data: Prisma.CardUncheckedCreateInput) {
    const card = await prisma.card.create({ data });

    return card;
  }

  async fetchByAccountAndType(account: string, type: string) {
    const cards = await prisma.card.findMany({
      where: {
        accountId: account,
        type: type as $Enums.CardType,
      },
    });

    return cards || null;
  }

  async findByNumber(number: string) {
    const card = await prisma.card.findUnique({
      where: {
        number,
      },
    });

    return card || null;
  }

  async fetchByAccount(data: FetchByAccountIdData) {
    const skip = (data.page - 1) * data.perPage;
    const accountsInfos = await prisma.$transaction([
      prisma.card.findMany({
        skip,
        take: data.perPage,
        where: {
          accountId: data.accountId,
        },
      }),
      prisma.card.count({
        where: {
          accountId: data.accountId,
        },
      }),
    ]);

    const cards = accountsInfos[0];
    const totalCards = accountsInfos[1];

    return { cards, totalCards };
  }
}
