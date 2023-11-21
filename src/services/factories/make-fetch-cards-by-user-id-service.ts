import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";
import { FetchCardsByUserIdService } from "../cards/fetch-cards-by-user-id-service";

export function MakeFetchCardsByUserIdService() {
  const cardsRepository = new PrismaCardsRepository();
  const fetchCardsByUserIdService = new FetchCardsByUserIdService(
    cardsRepository
  );

  return fetchCardsByUserIdService;
}
