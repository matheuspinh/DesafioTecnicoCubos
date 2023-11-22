import { MakeFetchCardsByUserIdService } from "@/services/factories/make-fetch-cards-by-user-id-service";
import { formatCardNumber } from "@/utils/format-card-number";
import { Request, Response } from "express";

export async function fetchCardsByUserId(req: Request, res: Response) {
  const userId = req.userId!;
  const { itemsPerPage, currentPage } = req.query;

  const page = Number(currentPage);
  const perPage = Number(itemsPerPage);

  const fetchCardsByUserIdService = MakeFetchCardsByUserIdService();

  try {
    const { cards, totalCards } = await fetchCardsByUserIdService.execute({
      userId,
      page,
      perPage,
    });

    const transformedCards = cards.map(({ accountId, userId, ...card }) => ({
      ...card,
      number: formatCardNumber(card.number),
    }));

    const responseData = {
      cards: transformedCards,
      pagination: {
        totalCount: totalCards,
        itemsPerPage: perPage,
        currentPage: page,
        pageCount: Math.ceil(totalCards / perPage),
      },
    };

    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
