import { Card, Prisma } from "@prisma/client";

export interface CardsRepository {
  create(data: Prisma.CardUncheckedCreateInput): Promise<Card>;
  fetchByAccountAndType(account: string, type: string): Promise<Card[] | null>;
  findByNumber(number: string): Promise<Card | null>;
}
