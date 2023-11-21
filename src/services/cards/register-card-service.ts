import { CardsRepository } from "@/repositories/cards-repository";
import { AccountAlreadyHasPhysicalCardError } from "../errors/account-already-has-physical-card-error";
import { CardAlreadyExistsError } from "../errors/card-already-exists-error";

interface RegisterCardServiceRequest {
  accountId: string;
  type: string;
  cvv: string;
  number: string;
  userId: string;
}

export class RegisterCardService {
  constructor(private cardsRepository: CardsRepository) {}

  async execute(data: RegisterCardServiceRequest) {
    const cardAlreadyRegistered = await this.cardsRepository.findByNumber(
      data.number
    );

    if (cardAlreadyRegistered) {
      throw new CardAlreadyExistsError();
    }

    const physicalCardAlreadyRegistered =
      await this.cardsRepository.fetchByAccountAndType(
        data.accountId,
        data.type
      );

    if (
      data.type === "physical" &&
      physicalCardAlreadyRegistered?.length !== 0
    ) {
      throw new AccountAlreadyHasPhysicalCardError();
    }

    const card = await this.cardsRepository.create({
      accountId: data.accountId,
      type: data.type as "physical" | "virtual",
      cvv: data.cvv,
      number: data.number,
      userId: data.userId,
    });

    return card;
  }
}
