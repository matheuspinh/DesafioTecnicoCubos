import {
  CardsRepository,
  FetchByAccountIdData,
} from "@/repositories/cards-repository";

export class FetchCardsByAccountIdService {
  constructor(private cardsRepository: CardsRepository) {}

  async execute(data: FetchByAccountIdData) {
    const { cards, totalCards } = await this.cardsRepository.fetchByAccount(
      data
    );

    return { cards, totalCards };
  }
}
