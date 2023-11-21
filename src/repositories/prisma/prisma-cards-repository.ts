import { Prisma, $Enums } from "@prisma/client";
import { CardsRepository } from "../cards-repository";
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
}
