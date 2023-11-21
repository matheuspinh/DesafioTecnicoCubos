import { $Enums, Card, Prisma } from "@prisma/client";
import { CardsRepository } from "../cards-repository";
import { randomUUID } from "crypto";

export class FakeCardsRepository implements CardsRepository {
  public items: Card[] = [];

  async create(data: Prisma.CardUncheckedCreateInput) {
    const card = {
      id: randomUUID(),
      accountId: data.accountId,
      type: data.type,
      cvv: data.cvv,
      number: data.number,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(card);

    return card;
  }

  async fetchByAccountAndType(account: string, type: string) {
    const cardFound = this.items.filter(
      (card) => card.accountId === account && card.type === type
    );

    return cardFound || null;
  }

  async findByNumber(number: string) {
    const cardFound = this.items.find((card) => card.number === number);

    return cardFound || null;
  }

  async fetchByAccount(data: {
    accountId: string;
    page: number;
    perPage: number;
  }) {
    let skip = (data.page - 1) * data.perPage;

    const cardsList = this.items.filter(
      (card) => card.accountId === data.accountId
    );
    const totalCards = cardsList.length;
    const cards = cardsList.slice(skip, skip + data.perPage);

    return { cards, totalCards };
  }

  async fetchByUserId(data: { userId: string; page: number; perPage: number }) {
    let skip = (data.page - 1) * data.perPage;

    const cardsList = this.items.filter((card) => card.userId === data.userId);
    const totalCards = cardsList.length;
    const cards = cardsList.slice(skip, skip + data.perPage);

    return { cards, totalCards };
  }
}
