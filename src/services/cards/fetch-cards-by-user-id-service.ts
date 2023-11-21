import {
  CardsRepository,
  FetchByUserIdData,
} from "@/repositories/cards-repository";

export class FetchCardsByUserIdService {
  constructor(private cardsRepository: CardsRepository) {}

  async execute(data: FetchByUserIdData) {
    const { cards, totalCards } = await this.cardsRepository.fetchByUserId(
      data
    );

    return { cards, totalCards };
  }
}
