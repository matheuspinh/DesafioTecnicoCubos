import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";
import { FetchCardsByAccountIdService } from "../cards/fetch-cards-by-account-id-service";

export function MakeFetchCardsByAccountIdService() {
  const cardsRepository = new PrismaCardsRepository();
  const fetchCardsByAccountIdService = new FetchCardsByAccountIdService(
    cardsRepository
  );

  return fetchCardsByAccountIdService;
}
