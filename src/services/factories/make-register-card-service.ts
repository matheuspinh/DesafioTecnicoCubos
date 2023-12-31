import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";
import { RegisterCardService } from "../cards/register-card-service";

export function MakeRegisterCardService() {
  const cardsRepository = new PrismaCardsRepository();
  const registerCardService = new RegisterCardService(cardsRepository);

  return registerCardService;
}
