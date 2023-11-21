import { Card, Prisma } from "@prisma/client";

export interface FetchByAccountIdData {
  accountId: string;
  page: number;
  perPage: number;
}

export interface FetchByUserIdData {
  userId: string;
  page: number;
  perPage: number;
}
export interface CardsRepository {
  create(data: Prisma.CardUncheckedCreateInput): Promise<Card>;
  fetchByAccountAndType(account: string, type: string): Promise<Card[] | null>;
  fetchByAccount(
    data: FetchByAccountIdData
  ): Promise<{ cards: Card[]; totalCards: number }>;
  findByNumber(number: string): Promise<Card | null>;
  fetchByUserId(
    data: FetchByUserIdData
  ): Promise<{ cards: Card[]; totalCards: number }>;
}
